import React from 'react';
import { View, Text } from 'react-native';
import AvatarSad from '@assets/icons/avatarSad.svg';

interface Props {
  message: string;
}

const AvatarSadMsg = ({ message = `오늘의 일상을 업로드하면\n친구들의 일상을 볼 수 있어요!` }: Props) => {
  return (
    <View className="items-center">
      <AvatarSad />
      <View className="flex flex-col items-center">
        <Text className="font-UhBee text-black900 text-2xl text-center leading-[26px] mt-[6px]">{message}</Text>
      </View>
    </View>
  );
};

export default AvatarSadMsg;
