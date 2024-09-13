import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import profilePng from '@assets/png/profile.png';

interface Props {
  index: number;
  length: number;
  isTeam: boolean;
}

const TeamFriendItem = ({ index, length, isTeam }: Props) => {
  return (
    <View
      className={`${index === 0 && 'border-t-[1px] rounded-t-2xl'} ${index === length - 1 && 'border-b-[1px] rounded-b-2xl'}
      h-[60px] bg-white w-full flex flex-row justify-between items-center px-4 border-r-[1px] border-l-[1px] border-black200`}>
      <View className="flex flex-row gap-2 items-center">
        <Image source={profilePng} className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200" />
        <Text className="text-black900 font-PTDLight text-sm">채순</Text>
      </View>
      <TouchableOpacity
        className={`${isTeam ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 w-[74px] flex justify-center items-center rounded-xl`}>
        <Text className={`${isTeam ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{isTeam ? '모임' : '모임추가'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamFriendItem;
