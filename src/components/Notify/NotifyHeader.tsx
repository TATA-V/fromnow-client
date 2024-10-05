import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';

interface Props {
  title: string;
}

const NotifyHeader = ({ title }: Props) => {
  const { navigation } = useNavi();

  return (
    <View className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <View className="w-[69px] h-[48px] justify-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-[44px] h-[44px] p-[10px]">
          <LeftArrowIcon />
        </TouchableOpacity>
      </View>
      <Text className="text-black900 text-base font-PTDSemiBold">{title}</Text>
      <TouchableOpacity className="w-[69px] h-[48px] justify-center items-center">
        <Text className="text-black700 text-[12px] font-PTDLight">모두 읽음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotifyHeader;
