import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useNavi from '@hooks/useNavi';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '@utils/deviceInfo';

interface Props {
  title: string;
}

const TeamDetailHeader = ({ title }: Props) => {
  const { navigation } = useNavi();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ top: isAndroid ? insets.top : 0 }}
      className="absolute px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between z-10">
      <TouchableOpacity onPress={() => navigation.goBack()} className="w-[44px] h-[44px] p-[10px]">
        <LeftArrowIcon />
      </TouchableOpacity>
      <Text className="text-black900 text-base font-PTDSemiBold">{title}</Text>
      <View className="w-[44px] h-[44px]" />
    </View>
  );
};

export default TeamDetailHeader;
