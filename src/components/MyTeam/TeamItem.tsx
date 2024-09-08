import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import profilePng from '@assets/png/profile.png';

interface Props {
  isTeam: boolean;
}

const TeamItem = ({ isTeam }: Props) => {
  const imgList = [...Array(7)];

  return (
    <View className="h-[94px] rounded-2xl bg-white w-full flex flex-row justify-between items-center p-4">
      <View className="space-y-3">
        <View className="flex flex-row">
          {imgList.slice(0, 5).map((_, idx) => (
            <View
              key={idx}
              className={`${idx === 0 ? 'ml-0' : 'ml-[-12px]'} w-[36px] h-[36px] border-[1px] border-black200 rounded-xl overflow-hidden`}>
              <Image source={profilePng} className="w-[36px] h-[36px]" resizeMode="cover" />
            </View>
          ))}
        </View>
        <Text className="text-black900 text-sm font-PTDLight">프나를 개발하는 모임</Text>
      </View>
      <TouchableOpacity
        className={`${isTeam ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 w-[74px] flex justify-center items-center rounded-xl`}>
        <Text className={`${isTeam ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{isTeam ? '모임' : '모임추가'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamItem;
