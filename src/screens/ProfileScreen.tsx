import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MyPhoto from '@components/Profile/MyPhoto';
import FriendsIcon from '@assets/icons/friends.svg';
import FolderIcon from '@assets/icons/folder.svg';
import HeartsIcon from '@assets/icons/hearts.svg';
import LogoutIcon from '@assets/icons/logout.svg';
import PeoplePolicyIcon from '@assets/icons/people-policy.svg';
import DocumentIcon from '@assets/icons/document.svg';
import CcIcon from '@assets/icons/cc.svg';
import useNavi from '@hooks/useNavi';
import { removeStorageAll } from '@utils/storage';
import MyNickname from '@components/Profile/MyNickname';
import { useGetMyProfile } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import { useQueryClient } from '@tanstack/react-query';

const ProfileScreen = () => {
  const { navigation } = useNavi();
  const { data, isLoading } = useGetMyProfile();
  const queryClient = useQueryClient();

  const navigateToScreen = (target: string, options?: { [key: string]: string | boolean }) => {
    navigation.navigate(target, { ...options });
  };
  const logoutUser = async () => {
    queryClient.clear();
    await removeStorageAll();
    navigation.navigate('SignIn');
  };

  const list = [
    { icon: <FriendsIcon />, label: '내 친구', section: '친구 관리', onPress: () => navigateToScreen('MyFriend') },
    { icon: <FolderIcon />, label: '받은 모임 요청', section: '모임 관리', onPress: () => navigateToScreen('MyTeamRequest') },
    { icon: <HeartsIcon />, label: '좋아요 누른 일상', section: '일상 관리', onPress: () => navigateToScreen('MyLikedBoard') },
    { icon: <LogoutIcon />, label: '로그아웃', section: '정보 관리', onPress: logoutUser },
    {
      icon: <PeoplePolicyIcon />,
      label: '개인정보처리방침',
      section: '고객 센터',
      onPress: () => navigateToScreen('PrivacyPolicy', { showSignupPolicy: false }),
      submenu: [
        {
          icon: <DocumentIcon />,
          label: '이용약관',
          onPress: () => navigateToScreen('ServicePolicy', { showSignupPolicy: false }),
        },
        // { icon: <CcIcon />, label: '사업자 정보', onPress: () => {} },
      ],
    },
  ];

  if (isLoading)
    return (
      <View className="flex-1 bg-white pt-16">
        <MiniLoading />
      </View>
    );

  return (
    <ScrollView className="px-4 flex-1 bg-white" contentContainerStyle={{ paddingBottom: 135 }} showsVerticalScrollIndicator={false}>
      <View className="h-[220px] flex items-center justify-center">
        <MyPhoto photoUrl={data.photoUrl} />
        <MyNickname profileName={data.profileName} />
      </View>
      {list.map(({ icon, label, section, submenu, onPress }, key) => (
        <View key={key} className="h-[98px] pt-[12px]">
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
