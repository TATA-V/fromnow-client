import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BellIcon from '@assets/icons/BellIcon';
import useNavi from '@hooks/useNavi';
import { useTranslation } from 'react-i18next';

const ProfileHeader = () => {
  const { navigation } = useNavi();
  const { t } = useTranslation();

  return (
    <View className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <View className="w-[48px] h-[48px]" />
      <Text className="text-black900 text-base font-PTDSemiBold">{t('header.profile')}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Notice')} className="w-[48px] h-[48px] p-3">
        <BellIcon />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
