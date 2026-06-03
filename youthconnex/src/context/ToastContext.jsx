import { createContext, useContext, useState, useCallback } from 'react';
import { TOAST_AUTO_DISMISS_TIME, TOAST_VARIANTS } from '../config';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, variant = TOAST_VARIANTS.INFO) => {
    const id = Date.now();
    const toast = { id, message, variant };
    
    setToasts((prev) => [...prev, toast]);

    // Auto-dismiss after configured time
    setTimeout(() => {
      removeToast(id);
    }, TOAST_AUTO_DISMISS_TIME);

    return id;
  }, [removeToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    success: (message) => addToast(message, TOAST_VARIANTS.SUCCESS),
    error: (message) => addToast(message, TOAST_VARIANTS.ERROR),
    warning: (message) => addToast(message, TOAST_VARIANTS.WARNING),
    info: (message) => addToast(message, TOAST_VARIANTS.INFO),
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

/**
 * Custom hook to use toast notifications
 * @returns {object} Toast context value with methods: addToast, removeToast, success, error, warning, info
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
