import React from 'react';
import { View } from 'react-native';
import ShareIcon from '@assets/icons/ShareIcon';
import Button from '@components/common/Button';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useKakaoShare from '@hooks/useKakaoShare';
import { useTranslation } from 'react-i18next';

const SearchNotFound = () => {
  const { kakaoShare } = useKakaoShare();
  const { t } = useTranslation();

  return (
    <View className="h-screen flex flex-col items-center justify-center transfrom translate-y-[-94px]">
      <AvatarSadMsg message={t('avatar.friendNotFound')} />
      <View className="mt-[24px]">
        <Button onPress={kakaoShare} size="mid" icon={<ShareIcon />}>
          프롬나우 전파하기
        </Button>
      </View>
    </View>
  );
};

export default SearchNotFound;
