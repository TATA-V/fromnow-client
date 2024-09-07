import React from 'react';
import { View, Text, Image } from 'react-native';
import profilePng from '@assets/png/profile.png';

const NotifyItem = () => {
  return (
    <View className="h-[60px] flex flex-row items-center space-x-[8px]">
      <View className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200">
        <Image source={profilePng} className="w-[36px] h-[36px] rounded-xl" resizeMode="cover" />
      </View>
      <Text className="text-black900 font-PTDLight text-sm">
        <Text className="font-PTDSemiBold">출근실어</Text>님이 <Text className="font-PTDSemiBold">프롬나우</Text> 모임에 당신을 초대 했어요.
      </Text>
    </View>
  );
};

export default NotifyItem;
