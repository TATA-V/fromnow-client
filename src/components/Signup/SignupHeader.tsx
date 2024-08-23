import React from 'react';
import { View, Text, Pressable } from 'react-native';
import LeftArrowIcon from '@assets/icons/leftArrow.svg';
import useNavi from '@hooks/useNavi';

const SignupHeader = () => {
  const { navigation } = useNavi();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <Pressable onPress={goBack} className="w-[44px] h-[44px] p-[10px]">
        <LeftArrowIcon />
      </Pressable>
      <Text className="text-black900 text-base font-PTDSemiBold">회원가입</Text>
      <View className="w-[44px] h-[44px]" />
    </View>
  );
};

export default SignupHeader;
