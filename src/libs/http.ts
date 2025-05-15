import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private signal?: AbortSignal;
  private accessToken: string = localStorage.getItem("access_token") || "";

  constructor(configs: AxiosRequestConfig, signal?: AbortSignal) {
    this.axiosInstance = axios.create({
      baseURL: configs.baseURL,
      timeout: configs.timeout || 3000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",

        ...configs.headers,
      },
      ...configs,
    });

    this.signal = signal;

    this.initInterceptors();
  }

  public setToken(token?: string): void {
    this.accessToken = token || "";
    console.log("token", token);
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }

  public getToken(): string {
    return this.accessToken;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "GET", url, ...config });
  }

  public async post<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ method: "POST", url, data, ...config });
  }

  public async put<T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ method: "PUT", url, data, ...config });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: "DELETE", url, ...config });
  }

  public async uploadFile<T, D>(
    url: string,
    files: File | File[],
    data?: Record<string, D>,
    config?: AxiosRequestConfig
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
    });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.request<T>({
        ...config,
        signal: this.signal,
      });

      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.info("Request was cancelled");
      } else if (error instanceof AxiosError) {
        console.error("Request failed with error", error.response?.statusText);
      } else {
        console.error("Unexpected error occured", (error as Error).message);
      }

      return Promise.reject(error);
    }
  }

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
