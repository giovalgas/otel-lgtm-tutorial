import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { trace, SpanKind, SpanStatusCode, context, ROOT_CONTEXT, defaultTextMapSetter } from "@opentelemetry/api";
import type { Span } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";

import { environment } from "./environment";

interface AxiosRequestConfigWithSpan extends InternalAxiosRequestConfig {
  __span?: Span;
}

const tracer = trace.getTracer("http_frontend");
const propagator = new W3CTraceContextPropagator();

export const api = axios.create({
  baseURL: environment.api,
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const url = new URL(config.url || '', config.baseURL);
  const spanName = `HTTP ${config.method?.toUpperCase() || 'GET'} ${url.pathname}`;
  
  const span = tracer.startSpan(spanName, {
    kind: SpanKind.CLIENT,
    attributes: {
      'http.method': config.method?.toUpperCase() || 'GET',
      'http.url': url.toString(),
      'http.target': url.pathname,
    }
  }, ROOT_CONTEXT);
  
  const headers: Record<string, string> = {};
  const ctx = trace.setSpan(context.active(), span);
  propagator.inject(ctx, headers, defaultTextMapSetter);
  
  config.headers = config.headers || {};
  if (headers['traceparent']) {
    config.headers['traceparent'] = headers['traceparent'];
  }
  
  (config as AxiosRequestConfigWithSpan).__span = span;
  
  return config;
});

api.interceptors.response.use(
  (response) => {
    const span = (response.config as AxiosRequestConfigWithSpan).__span;
    
    if (span) {
      span.setAttributes({
        'http.status_code': response.status,
        'http.status_text': response.statusText,
      });
      
      if (response.status >= 400) {
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: `HTTP Error ${response.status}: ${response.statusText}`,
        });
      } else {
        span.setStatus({ code: SpanStatusCode.OK });
      }
      
      span.end();
    }
    
    return response;
  },
  (error) => {
    const span = error.config ? (error.config as AxiosRequestConfigWithSpan).__span : undefined;
    
    if (span) {
      if (error.response) {
        span.setAttributes({
          'http.status_code': error.response.status,
          'http.status_text': error.response.statusText,
        });
      }
      
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      
      span.end();
    }
    
    return Promise.reject(error);
  }
);
