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
import { getStorage, removeStorageAll } from '@utils/storage';
import MyNickname from '@components/Profile/MyNickname';
import { useDeleteUser, useGetMyProfile } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import { useQueryClient } from '@tanstack/react-query';
import useUserStore from '@store/useUserStore';

const ProfileScreen = () => {
  const { navigation } = useNavi();
  const username = useUserStore(state => state.name);
  const { data, isLoading } = useGetMyProfile();
  const { deleteUserMutation } = useDeleteUser();
  const queryClient = useQueryClient();

  const navigateToScreen = (target: string, options?: { [key: string]: string | boolean }) => {
    navigation.navigate(target, { ...options });
  };
  const logoutUser = async () => {
    await queryClient.invalidateQueries();
    await removeStorageAll();
    navigation.navigate('SignIn');
  };
  const removeUser = async () => {
    deleteUserMutation.mutate(username);
  };

  const list = [
    { icon: <FriendsIcon />, label: '내 친구', section: '친구 관리', onPress: () => navigateToScreen('MyFriend') },
    { icon: <FolderIcon />, label: '받은 모임 요청', section: '모임 관리', onPress: () => navigateToScreen('MyTeamRequest') },
    { icon: <HeartsIcon />, label: '좋아요 누른 일상', section: '일상 관리', onPress: () => navigateToScreen('MyLikedBoard') },
    {
      icon: <LogoutIcon />,
      label: '로그아웃',
      section: '정보 관리',
      onPress: logoutUser,
      submenu: [{ icon: <LogoutIcon />, label: '탈퇴하기', onPress: removeUser }],
    },
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
