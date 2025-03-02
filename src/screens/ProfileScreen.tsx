import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyPhoto from '@components/Profile/MyPhoto';
import FriendsIcon from '@assets/icons/friends.svg';
import FolderIcon from '@assets/icons/FolderIcon';
import HeartsIcon from '@assets/icons/hearts.svg';
import WithdrawalIcon from '@assets/icons/withdrawal.svg';
import PeoplePolicyIcon from '@assets/icons/people-policy.svg';
import DocumentIcon from '@assets/icons/document.svg';
import ExitIcon from '@assets/icons/exit.svg';
import useNavi from '@hooks/useNavi';
import { useGetMyProfile, useLogoutUser } from '@hooks/query';
import { useDebounce } from '@hooks/useOptimization';
import { useModal } from '@components/Modal';
import { useTranslation } from 'react-i18next';

import MyNickname from '@components/Profile/MyNickname';
import MiniLoading from '@components/common/MiniLoading';

const ProfileScreen = () => {
  const { navigation } = useNavi();
  const { data, isLoading } = useGetMyProfile();

  const { logoutUserMutation } = useLogoutUser();
  const { showModal } = useModal();
  const { t } = useTranslation();

  const navigateToScreen = (target: string, options?: { [key: string]: string | boolean }) => {
    navigation.navigate(target, { ...options });
  };
  const logoutUser = useDebounce(() => {
    logoutUserMutation.mutate();
  }, 500);

  const deleteUser = () => {
    showModal({
      type: 'account',
      title: t('profile.delete.title'),
      description: t('profile.delete.desc'),
      confirmStyle: { backgroundColor: '#F04438' },
    });
  };

  const list = [
    { icon: <FriendsIcon />, label: t('profile.friend.label'), section: t('profile.friend.section'), onPress: () => navigateToScreen('MyFriend') },
    { icon: <FolderIcon />, label: t('profile.team.label'), section: t('profile.team.section'), onPress: () => navigateToScreen('MyTeamRequest') },
    { icon: <HeartsIcon />, label: t('profile.heart.label'), section: t('profile.heart.section'), onPress: () => navigateToScreen('MyLikedBoard') },
    {
      icon: <ExitIcon />,
      label: t('profile.logout.label'),
      section: t('profile.logout.section'),
      onPress: logoutUser,
      submenu: [{ icon: <WithdrawalIcon />, label: t('profile.logout.submenuLabel'), onPress: deleteUser }],
    },
    {
      icon: <PeoplePolicyIcon />,
      label: t('profile.policy.label'),
      section: t('profile.policy.section'),
      onPress: () => navigateToScreen('PrivacyPolicy', { showSignupPolicy: false }),
      submenu: [
        {
          icon: <DocumentIcon />,
          label: t('profile.policy.submenuLabel'),
          onPress: () => navigateToScreen('ServicePolicy', { showSignupPolicy: false }),
        },
        // { icon: <CcIcon />, label: t('profile.policy.submenuLabel2'), onPress: () => {} },
      ],
    },
  ];

  return (
    <ScrollView className="px-4 flex-1 bg-white" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      <View className="h-[220px] flex items-center justify-center">
        {!isLoading && data && (
          <>
            <MyPhoto photoUrl={data.photoUrl} />
            <MyNickname profileName={data.profileName} />
          </>
        )}
        {isLoading && <MiniLoading />}
      </View>
      {list.map(({ icon, label, section, submenu, onPress }, key) => (
        <View key={key} className="pt-[12px]">
          <View className="h-[30px] justify-center">
            <Text className="text-black500 font-PTDSemiBold text-sm">{section}</Text>
          </View>
          <TouchableOpacity onPress={onPress} className="h-[56px] flex flex-row items-center">
            {icon}
            <Text className="ml-[4px] text-black900 font-PTDLight text-sm">{label}</Text>
          </TouchableOpacity>
          {submenu &&
            submenu.map(({ icon: subIcon, label: subLabel, onPress: subOnPress }, idx) => (
              <TouchableOpacity onPress={subOnPress} key={idx} className="h-[56px] flex flex-row items-center">
                {subIcon}
                <Text className="ml-[4px] text-black900 font-PTDLight text-sm">{subLabel}</Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default ProfileScreen;
