import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import {
  SimpleSpanProcessor,
  WebTracerProvider,
} from "@opentelemetry/sdk-trace-web";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { metrics, trace } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http/build/src/platform/browser";
import { environment } from "./environment";

const resource = resourceFromAttributes({
[ATTR_SERVICE_NAME]: "frontend",
});

const traceExporter = new OTLPTraceExporter({
url: `${environment.otelCollector}/v1/traces`,
headers: {},
});

const spanProcessor = new SimpleSpanProcessor(traceExporter);

const tracerProvider = new WebTracerProvider({
resource: resource,
spanProcessors: [spanProcessor]
});

const metricExporter = new OTLPMetricExporter({
url: `${environment.otelCollector}/v1/metrics`,
headers: {},
});
const metricReader = new PeriodicExportingMetricReader({
exporter: metricExporter,
exportIntervalMillis: 10000,
});

const meterProvider = new MeterProvider({
resource: resource,
readers: [metricReader],
});

metrics.setGlobalMeterProvider(meterProvider);
tracerProvider.register();
trace.setGlobalTracerProvider(tracerProvider);

registerInstrumentations({
instrumentations: [
    new FetchInstrumentation({
    propagateTraceHeaderCorsUrls: [
        new RegExp(`${environment.api}.*`),
    ],
    }),
    new DocumentLoadInstrumentation(),
],
});

