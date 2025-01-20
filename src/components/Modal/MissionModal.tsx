import React from 'react';
import { Text, Image, Modal, View } from 'react-native';
import { MotiView } from 'moti';
import Button from '@components/common/Button';
import { ModalState, useModal } from '@components/Modal';
import tempMissionPng from '@assets/png/mission.png';

const MissionModal = (props: ModalState) => {
  const { open, title, description, confirm, missionImg, lockBackdrop } = props;
  const { hideModal } = useModal();
  const confirmClick = () => {
    if (confirm) confirm();
    hideModal();
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={hideModal}>
      <View onTouchEnd={lockBackdrop ? undefined : hideModal} className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[279px] p-4 bg-white rounded-[24px] items-center">
          {title && <Text className="font-PTDSemiBold text-lg mb-[3px] text-black900 mt-4">{title}</Text>}
          <Text className="text-black900 text-sm font-PTDLight text-center">{description}</Text>
          <Image
            source={missionImg !== '' || !missionImg ? tempMissionPng : { uri: missionImg }}
            resizeMode="cover"
            className="w-[247pz] h-[100px] my-[24px]"
          />
          <Button onPress={confirmClick} customStyle={{ height: 40 }}>
            촬영 시작!
          </Button>
        </MotiView>
      </View>
    </Modal>
  );
};

export default MissionModal;
