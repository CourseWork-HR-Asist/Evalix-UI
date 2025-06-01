import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Extended request config that includes additional options
 */
export interface ExtendedRequestConfig extends AxiosRequestConfig {
  notificationOptions?: RequestOptions;
  [key: string]: unknown;
}

/**
 * Interface for HTTP middleware that can be attached to the HttpClient
 */
export interface HttpMiddleware {
  /**
   * Called before a request is made
   * @param config Request configuration
   * @returns Modified request configuration
   */
  beforeRequest?: (config: ExtendedRequestConfig) => ExtendedRequestConfig;

  /**
   * Called after a successful response is received
   * @param response Axios response
   * @param requestConfig Original request configuration
   * @returns Modified response
   */
  afterResponse?: (response: AxiosResponse, requestConfig: ExtendedRequestConfig) => AxiosResponse;

  /**
   * Called when an error occurs during a request
   * @param error Axios error
   * @param requestConfig Original request configuration
   * @returns Modified error or response to recover from the error
   */
  onError?: (error: AxiosError, requestConfig: ExtendedRequestConfig) => Promise<unknown> | unknown;
}

/**
 * Options that can be passed to a request
 */
export interface RequestOptions {
  [key: string]: unknown;
}
