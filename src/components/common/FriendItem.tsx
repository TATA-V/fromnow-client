import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import profilePng from '@assets/png/profile.png';

interface Props {
  isFriend: boolean;
}

const FriendItem = ({ isFriend }: Props) => {
  return (
    <View className="h-[60px] rounded-2xl bg-white w-full flex flex-row justify-between items-center px-4">
      <View className="flex flex-row gap-2 items-center">
        <Image source={profilePng} className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200" />
        <Text className="text-black900 font-PTDLight text-sm">채순</Text>
      </View>
      <TouchableOpacity
        className={`${isFriend ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 px-[12.5px] flex justify-center items-center rounded-xl`}>
        <Text className={`${isFriend ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{isFriend ? '친구' : '친구추가'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendItem;
