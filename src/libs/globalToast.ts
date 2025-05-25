import { ToastType } from '../components/ui/toast/hooks';
import { showToast as showToastUtil, hideToast as hideToastUtil } from '../components/ui/toast/toastUtils';

export interface GlobalToastHandler {
  showToast: (message: string, type: ToastType, duration?: number) => string;
}

let globalToastHandler: GlobalToastHandler | undefined;

/**
 * Set the global toast handler
 * @param handler Toast handler from React context
 */
export const setGlobalToastHandler = (handler: GlobalToastHandler): void => {
  globalToastHandler = handler;
};

/**
 * Show a toast notification
 * @param message Message to display
 * @param type Toast type (success, error, info, warning)
 * @param duration Duration in milliseconds
 * @returns The toast ID
 */
export const showGlobalToast = (
  message: string, 
  type: ToastType = 'info', 
  duration?: number
): string => {
  if (globalToastHandler) {
    return globalToastHandler.showToast(message, type, duration);
  }

  return showToastUtil(message, type, duration);
};

/**
 * Hide a toast notification
 * @param id Toast ID to hide
 */
export const hideGlobalToast = (id: string): void => {
  hideToastUtil(id);
};
