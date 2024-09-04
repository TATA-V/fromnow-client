import React from 'react';
import { Image, View, Text } from 'react-native';
import profilePng from '@assets/png/profile.png';

const MyPhoto = () => {
  return (
    <View className="pt-[66px] h-[214px] flex items-center justify-center">
      <Image source={profilePng} className="w-[160px] h-[160px] rounded-[56px] border-[1px] border-black200" />
      <Text className="text-black900 font-UhBee text-3xl mt-[10px]">채순</Text>
    </View>
  );
};

export default MyPhoto;
