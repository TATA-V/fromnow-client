import React, { Dispatch, SetStateAction } from 'react';
import { Text, Image, Modal, Pressable, ImageSourcePropType } from 'react-native';
import { MotiView } from 'moti';
import Button from '@components/common/Button';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description: string;
  confirm?: () => void;
  missionImg: ImageSourcePropType;
}

const MissionModal = ({ open, setOpen, title, description, confirm, missionImg }: Props) => {
  const confirmClick = () => {
    if (confirm) {
      confirm();
    }
    setOpen(false);
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[279px] p-4 bg-white rounded-[24px] items-center">
          {title && <Text className="font-PTDSemiBold text-lg mb-[3px] text-black900 mt-4">{title}</Text>}
          <Text className="text-black900 text-sm font-PTDLight">{description}</Text>
          <Image source={missionImg} resizeMode="cover" className="w-[247pz] h-[100px] my-[24px]" />
          <Button onPress={confirmClick} customStyle={{ height: 40 }}>
            촬영 시작!
          </Button>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default MissionModal;
