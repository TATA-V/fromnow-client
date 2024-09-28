import React from 'react';
import { Text, TouchableOpacity, Modal, Pressable, View } from 'react-native';
import { MotiView } from 'moti';
import { useModal, ModalState } from '@components/Modal/ModalManager';

const DialogModal = ({ open, title, description, confirm }: ModalState) => {
  const { hideModal } = useModal();

  const confirmClick = () => {
    if (confirm) {
      confirm();
    }
    hideModal();
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={hideModal}>
      <Pressable onPress={hideModal} className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[279px] p-4 bg-white rounded-[24px] items-center">
          {title && <Text className="font-PTDSemiBold text-lg mb-[3px] text-black900 mt-2">{title}</Text>}
          <Text className="text-black900 text-sm font-PTDLight text-center">{description}</Text>
          <View className="flex-row w-full justify-between mt-[24px]">
            <TouchableOpacity
              onPress={hideModal}
              className="w-[121.5px] border-[1px] border-[#E4E5EA] rounded-xl h-[40px] justify-center items-center">
              <Text className="font-semibold text-sm text-black900 font-PTDSemiBold">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmClick} className="w-[121.5px] bg-black900 rounded-xl h-[40px] justify-center items-center">
              <Text className="text-white font-semibold text-sm font-PTDSemiBold">확인</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default DialogModal;
