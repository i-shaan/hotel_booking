// toast.ts
import { toast, ToastOptions, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'info' | 'warn';

const SlideTransition = cssTransition({
  enter: 'slideInDown',
  exit: 'slideOutUp',

});

const defaultOptions: ToastOptions = {
  position: 'top-right', // Set to top-center for the "up" position
  autoClose: 2000,        // Auto close after 2 seconds
  hideProgressBar: true,
  closeOnClick: true,
  closeButton: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: SlideTransition,
};

const toastStyles: { [key in ToastType]: React.CSSProperties } = {
  success: { background: 'green', color: 'white' },
  error: { background: 'red', color: 'white' },
  info: { background: '#3498db', color: 'white' },
  warn: { background: '#f39c12', color: 'white' },
};

export const showToast = (message: string, type: ToastType = 'info', options?: ToastOptions) => {
  const toastOptions = { 
    ...defaultOptions, 
    ...options,
    style: { ...toastStyles[type] },
  };
  
  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'warn':
      toast.warn(message, toastOptions);
      break;
    case 'info':
    default:
      toast.info(message, toastOptions);
      break;
  }
};
