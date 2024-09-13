import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { MotiView } from 'moti';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description: string;
  confirm?: () => void;
}

const ConfirmModal = ({ open, setOpen, title, description, confirm }: Props) => {
  const confirmClick = () => {
    if (confirm) {
      confirm();
    }
    setOpen(false);
  };

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable onPress={() => setOpen(false)} className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[300px] p-5 bg-white rounded-2xl">
          {title && <Text className="font-PTDBold text-lg mb-3 text-[#FA8482]">{title}</Text>}
          <Text className="text-black900 text-sm font-PTDLight">{description}</Text>
          <TouchableOpacity onPress={confirmClick} className="mt-7 w-full bg-[#FA8482] rounded-xl h-12 justify-center items-center">
            <Text className="text-white text-base font-PTDSemiBold">확인</Text>
          </TouchableOpacity>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default ConfirmModal;
