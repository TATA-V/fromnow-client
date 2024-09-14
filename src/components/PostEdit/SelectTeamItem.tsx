import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import profilePng from '@assets/png/profile.png';

interface Props {
  isSharing: boolean;
}

const SelectTeamItem = ({ isSharing }: Props) => {
  const imgList = [...Array(7)];

  return (
    <View className="h-[94px] rounded-2xl bg-black100 w-full flex flex-row justify-between items-center p-4 border-[1px] border-black200">
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
        className={`${isSharing ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 w-[74px] flex justify-center items-center rounded-xl`}>
        <Text className={`${isSharing ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{isSharing ? '공유중' : '공유하기'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTeamItem;
