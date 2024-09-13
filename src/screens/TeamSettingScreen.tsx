import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native';
import TeamSettingHeader from '@components/TeamSetting/TeamSettingHeader';
import useCurrentRoute from '@hooks/useCurrentRoute';
import PlusIcon from '@assets/icons/PlusIcon';
import FriendItem from '@components/TeamSetting/FriendItem';
import profilePng from '@assets/png/profile.png';
import PenIcon from '@assets/icons/PenIcon';
import ShareIcon from '@assets/icons/ShareIcon';
import TrashIcon from '@assets/icons/trash.svg';
import { CLIENT_URL } from '@env';
import useNavi from '@hooks/useNavi';

interface Props {
  paramName: string;
}

const TeamSettingScreen = ({}: Props) => {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  console.log('route:', route.params.id);

  const friendList = [
    { profile: profilePng, nickname: '채순 (나)', isFriend: true },
    { profile: profilePng, nickname: '현아', isFriend: true },
    { profile: profilePng, nickname: '민혁', isFriend: false },
    { profile: profilePng, nickname: '채순', isFriend: true },
    { profile: profilePng, nickname: '현아', isFriend: true },
    { profile: profilePng, nickname: '민혁', isFriend: false },
    { profile: profilePng, nickname: '채순', isFriend: true },
    { profile: profilePng, nickname: '현아', isFriend: true },
    { profile: profilePng, nickname: '민혁', isFriend: false },
    { profile: profilePng, nickname: '채순', isFriend: true },
    { profile: profilePng, nickname: '현아', isFriend: true },
    { profile: profilePng, nickname: '민혁', isFriend: false },
    { profile: profilePng, nickname: '채순', isFriend: true },
    { profile: profilePng, nickname: '현아', isFriend: true },
    { profile: profilePng, nickname: '민혁', isFriend: false },
    { profile: profilePng, nickname: '채순', isFriend: true },
    { profile: profilePng, nickname: '현아', isFriend: true },
    { profile: profilePng, nickname: '민혁', isFriend: false },
  ];

  const settingList = [
    { icon: <PenIcon size={24} />, title: '모임정보 수정하기', onPress: () => navigation.navigate('TeamEdit', { id: route.params.id }) },
    {
      icon: <ShareIcon size={24} color="#E4E5EA" />,
      title: '초대링크 공유하기',
      onPress: async () => await Share.share({ message: `${CLIENT_URL}TeamSetting?id=${route.params.id}` }),
    },
    { icon: <TrashIcon />, title: '모임 삭제하기', onPress: () => {} },
  ];

  return (
    <>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View className="h-[26px] mt-[66px] justify-center">
          <Text className="font-PTDLight text-sm text-black500">모임 친구</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TeamFriendAdd', { id: route.params.id })}
          className="h-[60px] flex-row space-x-[8px] items-center">
          <View className="w-[48px] h-[48px] rounded-2xl border-[1px] border-black200 bg-black100 justify-center items-center">
            <PlusIcon size={24} />
          </View>
          <Text className="text-black900 text-sm font-PTDLight">친구 추가하기</Text>
        </TouchableOpacity>
        {friendList.map((item, index) => (
          <FriendItem {...item} key={index} />
        ))}
        <View className="mt-[12px] mb-[30px]">
          {settingList.map(({ icon, title, onPress }, index) => (
            <TouchableOpacity
              onPress={onPress}
              key={index}
              className={`flex-row space-x-[6px] h-[48px] items-center border-t-[1px] border-black100
            ${index === settingList.length - 1 && 'border-b-[1px]'}`}>
              {icon}
              <Text className="text-black700 text-sm font-PTDLight">{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TeamSettingHeader title="아줌마들의 우정은 디질때까지" dayCount={20} />
    </>
  );
};

export default TeamSettingScreen;
