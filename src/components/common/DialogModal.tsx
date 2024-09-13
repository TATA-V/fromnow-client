import React, { Dispatch, SetStateAction } from 'react';
import { Text, TouchableOpacity, Modal, Pressable, View } from 'react-native';
import { MotiView } from 'moti';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description: string;
  confirm: () => void;
}

const DialogModal = ({ open, setOpen, title, description, confirm }: Props) => {
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
          {title && <Text className="font-PTDBold text-lg mb-3 text-black900">{title}</Text>}
          <Text className="text-black text-sm font-PTDLight">{description}</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => setOpen(false)}
              className="mt-7 w-[122px] border-[1px] border-[#E4E5EA] rounded-xl h-12 justify-center items-center">
              <Text className="font-semibold text-base text-black900 font-PTDSemiBold">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmClick} className="mt-7 w-[122px] bg-[#509EEF] rounded-xl h-12 justify-center items-center">
              <Text className="text-white font-semibold text-base font-PTDSemiBold">확인</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </Pressable>
    </Modal>
  );
};

export default DialogModal;
