/**
 * This file provides the toast type and a hook for using toast functionality
 * directly with react-hot-toast
 */

// Toast types supported by the application
export type ToastType = 'success' | 'error' | 'info' | 'warning';

// Re-export the toast utilities for direct use
import { showToast, hideToast } from './toastUtils';

/**
 * Hook for using toast functionality in React components
 * This is a simple wrapper around the toast utilities
 */
export const useToast = () => {
  return {
    showToast,
    hideToast
  };
};
