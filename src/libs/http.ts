import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpMiddleware, NotificationMiddleware, RequestOptions, ExtendedRequestConfig } from "./http-middleware";

/**
 * HttpClient class that follows SOLID principles with middleware support
 */
export class HttpClient {
  private axiosInstance: AxiosInstance;
  private signal?: AbortSignal;
  private accessToken: string = localStorage.getItem("access_token") || "";
  private middlewares: HttpMiddleware[] = [];

  /**
   * Create a new HttpClient instance
   * @param configs Axios configuration
   * @param signal AbortSignal for cancelling requests
   * @param options Additional options
   */
  constructor(
    configs: AxiosRequestConfig, 
    signal?: AbortSignal,
    options?: {
      middlewares?: HttpMiddleware[];
      notificationDefaults?: {
        defaultSuccessMessage?: string;
        defaultErrorMessage?: string;
      }
    }
  ) {
    const axiosConfig = {
      ...configs,
      baseURL: import.meta.env.VITE_API_BASE_URL || configs.baseURL,
      timeout: configs.timeout || 3000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...configs.headers,
      }
    };
    
    this.axiosInstance = axios.create(axiosConfig);
    this.signal = signal;
    
    // Add default notification middleware if none provided
    if (!options?.middlewares || options.middlewares.length === 0) {
      this.middlewares = [
        new NotificationMiddleware(options?.notificationDefaults)
      ];
    } else {
      this.middlewares = options.middlewares;
    }

    this.initInterceptors();
  }

  /**
   * Add a middleware to the client
   * @param middleware Middleware to add
   */
  public addMiddleware(middleware: HttpMiddleware): void {
    this.middlewares.push(middleware);
  }

  /**
   * Get a middleware by type
   * @param type Middleware constructor
   * @returns The middleware instance or undefined
   */
  public getMiddleware<T extends HttpMiddleware>(type: new (...args: unknown[]) => T): T | undefined {
    return this.middlewares.find(middleware => middleware instanceof type) as T | undefined;
  }

  /**
   * Set the authentication token
   * @param token Token to set or undefined to clear
   */
  public setToken(token?: string): void {
    this.accessToken = token || "";
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }

  /**
   * Get the current authentication token
   * @returns The current token
   */
  public getToken(): string {
    return this.accessToken;
  }

  /**
   * Make a GET request
   * @param url URL to request
   * @param config Axios configuration
   * @param options Request options including notification options
   * @returns Promise with the response data
   */
  public async get<T>(
    url: string, 
    config?: AxiosRequestConfig, 
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ method: "GET", url, ...config }, options);
  }

  /**
   * Make a POST request
   * @param url URL to request
   * @param data Data to send
   * @param config Axios configuration
   * @param options Request options including notification options
   * @returns Promise with the response data
   */
  public async post<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ method: "POST", url, data, ...config }, options);
  }

  /**
   * Make a PUT request
   * @param url URL to request
   * @param data Data to send
   * @param config Axios configuration
   * @param options Request options including notification options
   * @returns Promise with the response data
   */
  public async put<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ method: "PUT", url, data, ...config }, options);
  }

  /**
   * Make a DELETE request
   * @param url URL to request
   * @param config Axios configuration
   * @param options Request options including notification options
   * @returns Promise with the response data
   */
  public async delete<T>(
    url: string, 
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>({ method: "DELETE", url, ...config }, options);
  }

  /**
   * Upload files
   * @param url URL to upload to
   * @param files File or files to upload
   * @param data Additional form data
   * @param config Axios configuration
   * @param options Request options including notification options
   * @returns Promise with the response data
   */
  public async uploadFile<T, D>(
    url: string,
    files: File | File[],
    data?: Record<string, D>,
    config?: AxiosRequestConfig,
    options?: RequestOptions
  ): Promise<T> {
    const formData = new FormData();

    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append(`files`, file);
      });
    } else {
      formData.append("file", files);
    }

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
    }

    return this.request<T>({
      method: "POST",
      url,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    }, options);
  }

  /**
   * Make a request with the given configuration
   * @param config Axios configuration
   * @param options Request options
   * @returns Promise with the response data
   */
  private async request<T>(
    config: AxiosRequestConfig, 
    options?: RequestOptions
  ): Promise<T> {
    // Store options in config for middleware access
    const configWithOptions: ExtendedRequestConfig = {
      ...config,
      notificationOptions: options
    };

    // Apply beforeRequest middleware
    let finalConfig = configWithOptions;
    for (const middleware of this.middlewares) {
      if (middleware.beforeRequest) {
        finalConfig = middleware.beforeRequest(finalConfig);
      }
    }

    try {
      const response = await this.axiosInstance.request<T>({
        ...finalConfig,
        signal: this.signal,
      });

      // Apply afterResponse middleware
      let finalResponse = response;
      for (const middleware of this.middlewares) {
        if (middleware.afterResponse) {
          finalResponse = middleware.afterResponse(finalResponse, configWithOptions);
        }
      }

      return finalResponse.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.info("Request was cancelled");
      } else {
        for (const middleware of this.middlewares) {
          if (middleware.onError) {
            try {
              const result = middleware.onError(error as AxiosError, configWithOptions);
              if (result instanceof Promise) {
                await result;
              }
            } catch (middlewareError) {
              console.error("Error in middleware error handler:", middlewareError);
            }
          }
        }
      }

      return Promise.reject(error);
    }
  }

  /**
   * Initialize request and response interceptors
   */
  private initInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getToken();

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        console.error("Request failed with error", error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError && error.response?.status === 401) {
          console.error("Unauthorized request");
        }

        return Promise.reject(error);
      }
    );
  }
}
