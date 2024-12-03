import React, { createContext, ReactNode, useContext, useState } from 'react';
import ConfirmModal from '@components/Modal/ConfirmModal';
import DialogModal from '@components/Modal/DialogModal';
import MissionModal from '@components/Modal/MissionModal';
import AccountModal from '@components/Modal/AccountModal';

interface Props {
  children: ReactNode;
}

export interface ModalState {
  type: 'confirm' | 'dialog' | 'mission' | 'account';
  open: boolean;
  title?: string;
  description?: string;
  confirm?: () => void;
  missionImg?: string;
  lockBackdrop?: boolean;
  children?: ReactNode;
  enableHideConfirm?: boolean;
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

const ModalManager = React.memo(({ children }: Props) => {
  const [modalState, setModalState] = useState<ModalState>({
    type: 'dialog',
    open: false,
    title: '',
    description: '',
  });

  const showModal = (props: Omit<ModalState, 'open'>) => {
    setModalState({ ...props, open: true });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, open: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modalState.type === 'confirm' && <ConfirmModal {...modalState} />}
      {modalState.type === 'dialog' && <DialogModal {...modalState} />}
      {modalState.type === 'mission' && <MissionModal {...modalState} />}
      {modalState.type === 'account' && <AccountModal {...modalState} />}
    </ModalContext.Provider>
  );
});

export default ModalManager;
