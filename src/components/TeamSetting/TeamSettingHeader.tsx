import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '@assets/icons/leftArrow.svg';
import useNavi from '@hooks/useNavi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  title: string;
  dayCount: number;
}

const TeamSettingHeader = ({ title, dayCount }: Props) => {
  const { navigation } = useNavi();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ top: insets.top }} className="absolute px-[8px] h-[66px] w-full flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-[44px] h-[44px] p-[10px]">
          <LeftArrowIcon />
        </TouchableOpacity>
        <View className="flex flex-col h-[32px] justify-between">
          <Text className="text-black900 text-sm font-PTDSemiBold ml-[4px]">{title}</Text>
          <Text className="text-black500 text-[12px] font-PTDLight ml-[4px]">{dayCount}일째 일상을 공유하고 있어요 :)</Text>
        </View>
      </View>
    </View>
  );
};

export default TeamSettingHeader;
