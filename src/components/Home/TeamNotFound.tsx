import React from 'react';
import { View, Text } from 'react-native';
import AvatarHappy from '@assets/icons/avatarHappy.svg';
import Button from '@components/common/Button';
import PlusIcon from '@assets/icons/PlusIcon';

const TeamNotFound = () => {
  return (
    <View className="h-screen flex flex-col items-center justify-center transfrom translate-y-[-94px]">
      <AvatarHappy />
      <View className="flex flex-col items-center mb-6">
        <Text className="font-UhBee text-black900 text-2xl">모임을 생성하여</Text>
        <Text className="font-UhBee text-black900 text-2xl">소중한 순간을 기록하고 공유하세요 :)</Text>
      </View>
      <Button size="mid" icon={<PlusIcon size={24} color="white" />}>
        모임 생성하기
      </Button>
    </View>
  );
};

export default TeamNotFound;
