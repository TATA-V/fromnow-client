import React from 'react';
import { View, Share } from 'react-native';
import ShareIcon from '@assets/icons/ShareIcon';
import Button from '@components/common/Button';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import { CLIENT_URL } from '@env';

const SearchNotFound = () => {
  return (
    <View className="h-screen flex flex-col items-center justify-center transfrom translate-y-[-94px]">
      <AvatarSadMsg message={`친구를 찾지 못했어요 ;(\n링크를 공유하여 친구를 초대해 보세요!`} />
      <View className="mt-[24px]">
        <Button onPress={async () => await Share.share({ message: `${CLIENT_URL}` })} size="mid" icon={<ShareIcon />}>
          프롬나우 전파하기
        </Button>
      </View>
    </View>
  );
};

export default SearchNotFound;
