import React from 'react';
import { Text, TouchableOpacity, Modal, View } from 'react-native';
import { MotiView } from 'moti';
import { useModal, ModalState } from '@components/Modal';

const ConfirmModal = (props: ModalState) => {
  const { children, open, title, description, confirm, lockBackdrop } = props;
  const { hideModal } = useModal();

  const confirmClick = () => {
    if (confirm) confirm();
    hideModal();
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={hideModal}>
      <View onTouchEnd={lockBackdrop ? undefined : hideModal} className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          onTouchEnd={e => e.stopPropagation()}
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[279px] p-4 bg-white rounded-[24px] items-center">
          {title && <Text className="font-PTDSemiBold text-lg mb-2 text-black900 mt-2 text-center leading-[26px]">{title}</Text>}
          {description && <Text className="text-black900 text-sm font-PTDLight text-center">{description}</Text>}
          {children}
          <TouchableOpacity onPress={confirmClick} className="mt-[24px] w-full bg-black900 rounded-xl h-[40px] justify-center items-center">
            <Text className="text-white text-sm font-PTDSemiBold">확인</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
