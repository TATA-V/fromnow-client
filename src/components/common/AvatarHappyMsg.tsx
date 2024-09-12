import React from 'react';
import { View, Text } from 'react-native';
import AvatarHappy from '@assets/icons/avatarHappy.svg';

interface Props {
  message: string;
}

const AvatarHappyMsg = ({ message }: Props) => {
  return (
    <View className="items-center">
      <AvatarHappy />
      <View className="flex flex-col items-center">
        <Text className="font-UhBee text-black900 text-2xl text-center leading-[26px] mt-[6px]">{message}</Text>
      </View>
    </View>
  );
};

export default AvatarHappyMsg;
