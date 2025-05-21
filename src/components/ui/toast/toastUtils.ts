import toast from 'react-hot-toast';
import { ToastType } from './hooks';

// Helper function to get background color based on toast type
const getBackgroundColor = (type: ToastType): string => {
  switch (type) {
    case 'success': return '#10B981'; // green-500
    case 'error': return '#EF4444';   // red-500
    case 'warning': return '#F59E0B'; // amber-500
    case 'info': return '#3B82F6';    // blue-500
    default: return '#3B82F6';        // blue-500
  }
};

// Helper function to get icon based on toast type
const getIcon = (type: ToastType): string => {
  switch (type) {
    case 'success': return '✅';
    case 'error': return '❌';
    case 'warning': return '⚠️';
    case 'info': return 'ℹ️';
    default: return 'ℹ️';
  }
};

/**
 * Show a toast notification
 * @param message Message to display
 * @param type Toast type (success, error, info, warning)
 * @param duration Duration in milliseconds
 * @returns The toast ID
 */
export const showToast = (message: string, type: ToastType = 'info', duration = 3000): string => {
  // Configure toast options based on type
  const toastOptions = {
    duration,
    style: {
      borderRadius: '8px',
      background: getBackgroundColor(type),
      color: '#fff',
    },
    icon: getIcon(type),
  };

  return toast(message, toastOptions);
};

/**
 * Hide a toast notification
 * @param id Toast ID to hide
 */
export const hideToast = (id: string): void => {
  toast.dismiss(id);
};
