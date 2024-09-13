import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import profilePng from '@assets/png/profile.png';
import CircleXIcon from '@assets/icons/CircleXIcon';

const MyFriendItem = () => {
  return (
    <View className="h-[60px] w-[42px] px-[3px] py-[4px] items-center justify-between">
      <Image source={profilePng} className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200" resizeMode="cover" />
      <Text className="text-black900 text-sm font-PTDLight leading-6">채순</Text>
      <TouchableOpacity className="absolute top-0 right-0">
        <CircleXIcon size={16} color="#6E6D73" />
      </TouchableOpacity>
    </View>
  );
};

export default MyFriendItem;
