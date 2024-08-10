import { useToast as useToastNoti, ToastOptions } from 'react-native-toast-notifications';

const useToast = () => {
  const toast = useToastNoti();

  const showToast = (msg: string, type?: ToastOptions) => {
    toast.show(msg, { ...type });
  };

  return { showToast };
};

export default useToast;
