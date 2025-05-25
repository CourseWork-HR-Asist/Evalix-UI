import { AxiosError, AxiosResponse } from 'axios';
import { HttpMiddleware, RequestOptions, ExtendedRequestConfig } from './types';
import { showToast } from '../../components/ui/toast/toastUtils';
// Import the ToastType from toastUtils to ensure we're using the correct type

export interface NotificationOptions extends RequestOptions {
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Middleware that handles toast notifications for HTTP requests
 */
export class NotificationMiddleware implements HttpMiddleware {
  private defaultSuccessMessage: string;
  private defaultErrorMessage: string;

  constructor(options?: {
    defaultSuccessMessage?: string;
    defaultErrorMessage?: string;
  }) {
    this.defaultSuccessMessage = options?.defaultSuccessMessage || 'Success';
    this.defaultErrorMessage = options?.defaultErrorMessage || 'Error';
  }

  /**
   * Set default messages for success and error notifications
   */
  public setDefaultMessages(messages: { success?: string; error?: string }): void {
    if (messages.success) this.defaultSuccessMessage = messages.success;
    if (messages.error) this.defaultErrorMessage = messages.error;
  }

  /**
   * Handle successful responses
   */
  public afterResponse(response: AxiosResponse, requestConfig: ExtendedRequestConfig): AxiosResponse {
    const options = requestConfig.notificationOptions || {} as NotificationOptions;
    
    const {
      showSuccessToast = true,
      successMessage = this.defaultSuccessMessage,
    } = options;

    if (showSuccessToast) {
      showToast(String(successMessage), 'success');
    }

    return response;
  }

  /**
   * Handle errors
   */
  public onError(error: AxiosError, requestConfig: ExtendedRequestConfig): Promise<unknown> {
    const options = requestConfig.notificationOptions || {} as NotificationOptions;
    
    const {
      showErrorToast = true,
      errorMessage = this.defaultErrorMessage,
    } = options;

    if (showErrorToast) {
      let message = errorMessage;
      
      if (error.response?.data) {
        const responseData = error.response.data as Record<string, unknown>;
        if (typeof responseData.message === 'string') {
          message = responseData.message;
        } else if (typeof responseData.error === 'string') {
          message = responseData.error;
        }
      }
      
      showToast(String(message), 'error');
    }

    // Re-throw the error to be handled by other middleware or the client
    return Promise.reject(error);
  }
}
