import { useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { TOAST_VARIANTS } from '../../config';

const toastStyles = {
  [TOAST_VARIANTS.SUCCESS]: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: '✓',
    iconBg: 'bg-green-100',
  },
  [TOAST_VARIANTS.ERROR]: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '✕',
    iconBg: 'bg-red-100',
  },
  [TOAST_VARIANTS.WARNING]: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: '!',
    iconBg: 'bg-amber-100',
  },
  [TOAST_VARIANTS.INFO]: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ',
    iconBg: 'bg-blue-100',
  },
};

function Toast({ toast }) {
  const { removeToast } = useToast();
  const style = toastStyles[toast.variant] || toastStyles[TOAST_VARIANTS.INFO];

  useEffect(() => {
    // Auto-remove is handled by ToastContext, but we provide a manual close button too
  }, [toast.id]);

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg shadow-lg p-4 flex items-center gap-3 animate-slideIn`}
      role="alert"
    >
      <div className={`${style.iconBg} w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}>
        <span className={`${style.text} font-bold text-sm`}>{style.icon}</span>
      </div>
      <p className={`${style.text} flex-1 text-sm`}>{toast.message}</p>
      <button
        onClick={() => removeToast(toast.id)}
        className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0 font-semibold`}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 pointer-events-none z-50">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} />
        </div>
      ))}
    </div>
  );
}
