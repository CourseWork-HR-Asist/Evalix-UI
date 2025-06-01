import React, { useEffect, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ 
  id, 
  message, 
  type, 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); 
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  const getAlertColor = () => {
    switch (type) {
      case 'success': return 'green';
      case 'error': return 'red';
      case 'warning': return 'amber';
      case 'info': return 'blue';
      default: return 'blue';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircleIcon className="h-6 w-6" />;
      case 'error': return <ExclamationCircleIcon className="h-6 w-6" />;
      case 'warning': return <ExclamationCircleIcon className="h-6 w-6" />;
      case 'info': return <CheckCircleIcon className="h-6 w-6" />;
      default: return <CheckCircleIcon className="h-6 w-6" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-2"
        >
          <Alert
            open={true}
            color={getAlertColor()}
            className="max-w-screen-md"
            icon={getIcon()}
            action={
              <button onClick={() => {
                setIsVisible(false);
                setTimeout(() => onClose(id), 300);
              }}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            }
          >
            <Typography variant="paragraph" color="white">
              {message}
            </Typography>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
