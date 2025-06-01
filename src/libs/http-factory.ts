import { HttpClient } from "./http";
import { NotificationMiddleware } from "./http-middleware";
import { AxiosRequestConfig } from "axios";

/**
 * Options for creating an HttpClient
 */
export interface HttpClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  defaultSuccessMessage?: string;
  defaultErrorMessage?: string;
  signal?: AbortSignal;
}

/**
 * Factory function to create an HttpClient instance with notification middleware
 * @param options Configuration options
 * @returns HttpClient instance
 */
export const createHttpClient = (options: HttpClientOptions = {}): HttpClient => {
  const notificationMiddleware = new NotificationMiddleware({
    defaultSuccessMessage: options.defaultSuccessMessage,
    defaultErrorMessage: options.defaultErrorMessage,
  });

  const axiosConfig: AxiosRequestConfig = {
    baseURL: options.baseURL,
    timeout: options.timeout || 3000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  };

  return new HttpClient(
    axiosConfig,
    options.signal,
    {
      middlewares: [notificationMiddleware],
      notificationDefaults: {
        defaultSuccessMessage: options.defaultSuccessMessage,
        defaultErrorMessage: options.defaultErrorMessage,
      }
    }
  );
};