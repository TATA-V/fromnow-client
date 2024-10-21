import React from 'react';
import { Text, Image, Modal, View } from 'react-native';
import { MotiView } from 'moti';
import Button from '@components/common/Button';
import { ModalState, useModal } from '@components/Modal';

const MissionModal = ({ open, title, description, confirm, missionImg }: ModalState) => {
  const { hideModal } = useModal();
  const confirmClick = () => {
    if (confirm) {
      confirm();
    }
    hideModal();
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={hideModal}>
      <View className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[279px] p-4 bg-white rounded-[24px] items-center">
          {title && <Text className="font-PTDSemiBold text-lg mb-[3px] text-black900 mt-4">{title}</Text>}
          <Text className="text-black900 text-sm font-PTDLight">{description}</Text>
          <Image source={{ uri: missionImg }} resizeMode="cover" className="w-[247pz] h-[100px] my-[24px]" />
          <Button onPress={confirmClick} customStyle={{ height: 40 }}>
            촬영 시작!
          </Button>
        </MotiView>
      </View>
    </Modal>
  );
};

export default MissionModal;
