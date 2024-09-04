import React from 'react';
import { Text, View } from 'react-native';
import MyPhoto from '@components/ProfileMyInfo/MyPhoto';

const ProfileMyInfoScreen = () => {
  return (
    <View className="px-5">
      <MyPhoto />
      <View className="flex flex-row gap-[10px]">
        <View />
      </View>
    </View>
  );
};

export default ProfileMyInfoScreen;
