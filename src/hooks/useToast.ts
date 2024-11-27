import { useToast as useToastNoti, ToastOptions } from 'react-native-toast-notifications';

const useToast = () => {
  const toast = useToastNoti();

  const simpleToast = (msg: string, type?: ToastOptions) => {
    toast.show(msg, { ...type });
  };

  const successToast = (msg: string, type?: ToastOptions) => {
    toast.show(msg, {
      style: { backgroundColor: '#E7F5EC', borderRadius: 10, borderWidth: 1, borderColor: '#B0DDC1' },
      textStyle: { color: '#1C1C1E', textAlign: 'center', fontFamily: 'UhBeemysenBold', fontSize: 22 },
      ...type,
    });
  };

  const errorToast = (msg: string, type?: ToastOptions) => {
    toast.show(msg, {
      style: { backgroundColor: '#FFEEEE', borderRadius: 10, borderWidth: 1, borderColor: '#FEC7C6' },
      textStyle: { color: '#FF8A00', textAlign: 'center', fontFamily: 'UhBeemysenBold', fontSize: 22 },
      ...type,
    });
  };

  const warnToast = (msg: string, type?: ToastOptions) => {
    toast.show(msg, {
      style: { backgroundColor: '#FFF8DB', borderRadius: 10, borderWidth: 1, borderColor: '#FEE987' },
      textStyle: { color: '#FD7A00', textAlign: 'center', fontFamily: 'UhBeemysenBold', fontSize: 22 },
      ...type,
    });
  };

  return { simpleToast, successToast, errorToast, warnToast };
};

export default useToast;
