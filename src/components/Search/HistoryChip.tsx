import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CloseGrayIcon from '@assets/icons/closeGray.svg';

interface Props {
  title: string;
  removeOne: (title: string) => void;
}

const HistoryChip = ({ title, removeOne }: Props) => {
  return (
    <View className="border-black200 border-[1px] px-3 h-[32px] rounded-2xl flex flex-row justify-center items-center bg-black100 ml-[7px] mt-[7px]">
      <Text className="text-black900 text-sm font-PTDLight">{title}</Text>
      <TouchableOpacity onPress={() => removeOne(title)} className="ml-[6px]">
        <CloseGrayIcon />
      </TouchableOpacity>
    </View>
  );
};

export default HistoryChip;
