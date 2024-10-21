import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import { removeStorage } from '@utils/storage';

interface Props {
  title: string;
  isSignup?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

const DefaultHeader = ({ title, isSignup, customStyle }: Props) => {
  const { navigation } = useNavi();

  const goBack = async () => {
    if (isSignup) {
      await removeStorage('access');
    }
    navigation.goBack();
  };

  return (
    <View style={customStyle} className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <TouchableOpacity onPress={goBack} className="w-[44px] h-[44px] p-[10px]">
        <LeftArrowIcon />
      </TouchableOpacity>
      <Text className="text-black900 text-base font-PTDSemiBold">{title}</Text>
      <View className="w-[44px] h-[44px]" />
    </View>
  );
};

export default DefaultHeader;
