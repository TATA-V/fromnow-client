import React from 'react';
import { Text, View } from 'react-native';
import DiaryIcon from '@assets/icons/diary.svg';
import MyPhoto from '@components/ProfileMyInfo/MyPhoto';
import TeamIcon from '@assets/icons/team.svg';
import FriendIcon from '@assets/icons/friend.svg';

const ProfileMyInfoScreen = () => {
  return (
    <View className="px-5">
      <MyPhoto />
      <View className="flex flex-row gap-[10px]">
        <View className="w-full h-[72px] rounded-xl bg-black100 border-[1px] border-black200 flex justify-center items-center">
          <DiaryIcon />
          <Text className="text-black900 text-[12px] font-PTDLight mt-[5px]">내 일상</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileMyInfoScreen;
