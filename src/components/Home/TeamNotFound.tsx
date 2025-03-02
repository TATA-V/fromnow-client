import React from 'react';
import { View } from 'react-native';
import Button from '@components/common/Button';
import PlusIcon from '@assets/icons/PlusIcon';
import AvatarHappyMsg from '@components/common/AvatarHappyMsg';
import useNavi from '@hooks/useNavi';
import { useTranslation } from 'react-i18next';

const TeamNotFound = () => {
  const { navigation } = useNavi();
  const { t } = useTranslation();

  return (
    <View className="h-full flex flex-col items-center justify-center transform translate-y-[-120px]">
      <AvatarHappyMsg message={t('avatar.uploadDailyLife')} />
      <View className="mt-[24px]">
        <Button onPress={() => navigation.navigate('TeamCreate')} size="mid" icon={<PlusIcon size={24} color="white" />}>
          {t('home.createTeam')}
        </Button>
      </View>
    </View>
  );
};

export default TeamNotFound;
