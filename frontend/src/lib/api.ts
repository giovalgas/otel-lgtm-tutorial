import axios from "axios";

import { environment } from "./environment";

export const api = axios.create({
  baseURL: environment.api,
  timeout: 30000,
});

api.interceptors.request.use(async (config) => {
//   config.headers["X-Trace-Id"] = "ADICIONAR TRACE_ID";

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
