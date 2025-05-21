import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { setGlobalToastHandler } from '../../../libs/globalToast';
import { showToast } from './toastUtils';

/**
 * Ultra-minimal toast provider component that just renders the Toaster component
 * and sets up the global toast handler
 */
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    setGlobalToastHandler({ showToast });
  }, []);

  return (
    <>
      {children}
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            maxWidth: '500px',
          },
        }}
      />
    </>
  );
};
