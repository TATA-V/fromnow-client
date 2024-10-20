import React from 'react';
import { Text, Image, ImageProps, TouchableOpacity, View } from 'react-native';

interface Props {
  profile: ImageProps;
  nickname: string;
  isFriend: boolean;
}

const FriendItem = ({ profile, nickname, isFriend }: Props) => {
  return (
    <View className="h-[60px] flex-row justify-between items-center">
      <View className="flex-row space-x-[8px] items-center">
        <Image source={profile} className="w-[48px] h-[48px] rounded-2xl border-[1px] border-black200 justify-center items-center" />
        <Text className="text-black900 text-sm font-PTDLight">{nickname}</Text>
      </View>
      <TouchableOpacity
        className={`${isFriend ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 w-[74px] flex justify-center items-center rounded-xl`}>
        <Text className={`${isFriend ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{isFriend ? '친구' : '친구추가'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendItem;
