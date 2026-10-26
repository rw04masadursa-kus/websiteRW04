import React, { useEffect, useState } from 'react';
import { CheckCircle2, MessageCircle, AlertCircle, X, ExternalLink } from 'lucide-react';

export interface ToastMessage {
  id: string;
  tipe: 'success' | 'whatsapp' | 'info' | 'error';
  judul: string;
  pesan: string;
  waLink?: string;
}

let toastHandler: ((toast: ToastMessage) => void) | null = null;

export function triggerGlobalToast(toast: Omit<ToastMessage, 'id'>) {
  if (toastHandler) {
    toastHandler({
      ...toast,
      id: Math.random().toString(36).substring(2, 9)
    });
  }
}

export const NotificationToaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    toastHandler = (toast) => {
      setToasts((prev) => [toast, ...prev.slice(0, 3)]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 7000);
    };

    return () => {
      toastHandler = null;
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm sm:max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-4 transition-all duration-300 animate-in slide-in-from-bottom-5"
        >
          <div className="flex items-start gap-3">
            {toast.tipe === 'whatsapp' && (
              <div className="p-2 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-lg shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
            )}
            {toast.tipe === 'success' && (
              <div className="p-2 bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 rounded-lg shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            {toast.tipe === 'error' && (
              <div className="p-2 bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-lg shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
            {toast.tipe === 'info' && (
              <div className="p-2 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-lg shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {toast.judul}
                </h4>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-3">
                {toast.pesan}
              </p>
              {toast.waLink && (
                <a
                  href={toast.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Buka Chat WhatsApp <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
