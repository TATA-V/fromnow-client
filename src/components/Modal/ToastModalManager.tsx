import React, { createContext, ReactNode, useContext, useState } from 'react';
import ToastModal from '@components/Modal/ToastModal';

interface Props {
  children: ReactNode;
}

export interface ToastModalState {
  type: 'success' | 'warn' | 'error';
  open: boolean;
  message: string;
}
interface ToastModalContextType {
  showToastModal: (props: Omit<ToastModalState, 'open'>) => void;
}
const ToastModalContext = createContext<ToastModalContextType | undefined>(undefined);

export const useToastModal = (): ToastModalContextType => {
  const context = useContext(ToastModalContext);
  return context;
};

// toast가 Modal에 가려질 때만 이 toastModal을 사용할 거임 (주로 Drawer UI일 때)
const ToastModalManager = ({ children }: Props) => {
  const [toastModal, setToastModal] = useState<ToastModalState>({
    type: 'success',
    open: false,
    message: '',
  });

  const showToastModal = (props: Omit<ToastModalState, 'open'>) => {
    setToastModal({ ...props, open: true });
  };
  const close = () => {
    setToastModal(prev => ({ ...prev, open: false }));
  };

  return (
    <ToastModalContext.Provider value={{ showToastModal }}>
      {children}
      <ToastModal {...toastModal} close={close} />
    </ToastModalContext.Provider>
  );
};

export default ToastModalManager;
