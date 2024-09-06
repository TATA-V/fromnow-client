import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BellIcon from '@assets/icons/bell.svg';

const ProfileHeader = () => {
  return (
    <View className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <View className="w-[48px] h-[48px]" />
      <Text className="text-black900 text-base font-PTDSemiBold">내 정보</Text>
      <TouchableOpacity className="w-[48px] h-[48px] p-3">
        <BellIcon />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
