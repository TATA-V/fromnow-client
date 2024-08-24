import React from 'react';
import { View, Text, Share } from 'react-native';
import AvatarSad from '@assets/icons/avatarSad.svg';
import ShareIcon from '@assets/icons/share.svg';
import Button from '@components/common/Button';

const SearchNotFound = () => {
  return (
    <View className="h-screen flex flex-col items-center justify-center transfrom translate-y-[-94px]">
      <AvatarSad />
      <View className="flex flex-col items-center mb-6">
        <Text className="font-UhBee text-black900 text-2xl">친구를 찾지 못했어요 ;(</Text>
        <Text className="font-UhBee text-black900 text-2xl">링크를 공유하여 친구를 초대해 보세요!</Text>
      </View>
      <Button onPress={async () => await Share.share({ message: '프롬나우 전파하기' })} size="mid" Icon={ShareIcon}>
        프롬나우 전파하기
      </Button>
    </View>
  );
};

export default SearchNotFound;
