import React from 'react';
import { View, Text, Share } from 'react-native';
import ShareIcon from '@assets/icons/share.svg';
import Button from '@components/common/Button';
import AvatarSadMsg from '../common/AvatarSadMsg';

const SearchNotFound = () => {
  return (
    <View className="h-screen flex flex-col items-center justify-center transfrom translate-y-[-94px]">
      <AvatarSadMsg message={`친구를 찾지 못했어요 ;(\n링크를 공유하여 친구를 초대해 보세요!`} />
      <View className="mt-[24px]">
        <Button onPress={async () => await Share.share({ message: '프롬나우 전파하기' })} size="mid" icon={<ShareIcon />}>
          프롬나우 전파하기
        </Button>
      </View>
    </View>
  );
};

export default SearchNotFound;
