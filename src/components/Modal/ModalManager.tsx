import React, { createContext, ReactNode, useContext, useState } from 'react';
import ConfirmModal from '@components/Modal/ConfirmModal';
import DialogModal from '@components/Modal/DialogModal';

interface Props {
  children: ReactNode;
}

interface ModalState {
  type: 'confirm' | 'dialog';
  open: boolean;
  title?: string;
  description: string;
  confirm?: () => void;
}
interface ModalContextType {
  showModal: (modalData: Omit<ModalState, 'open'>) => void;
  hideModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  return context;
};

const ModalManager = ({ children }: Props) => {
  const [modalState, setModalState] = useState<ModalState>({
    type: 'dialog',
    open: false,
    title: '',
    description: '',
  });

  const showModal = ({ type, title, description, confirm }: Omit<ModalState, 'open'>) => {
    setModalState({ type, open: true, title, description, confirm });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, open: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalState.type === 'confirm' ? (
        <ConfirmModal open={modalState.open} title={modalState.title} description={modalState.description} confirm={modalState.confirm} />
      ) : (
        <DialogModal open={modalState.open} title={modalState.title} description={modalState.description} confirm={modalState.confirm} />
      )}
    </ModalContext.Provider>
  );
};

export default ModalManager;
