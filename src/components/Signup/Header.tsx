import React from 'react';
import { View, Text, Pressable } from 'react-native';
import LeftArrowIcon from '@assets/icons/leftArrow.svg';
import useNavi from '@hooks/useNavi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
  const { navigation } = useNavi();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ top: insets.top }} className="absolute px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <Pressable onPress={goBack} className="w-[44px] h-[44px] p-[10px]">
        <LeftArrowIcon />
      </Pressable>
      <Text className="text-black900 text-base font-PTDSemiBold">회원가입</Text>
      <View className="w-[44px] h-[44px]" />
    </View>
  );
};

export default Header;
