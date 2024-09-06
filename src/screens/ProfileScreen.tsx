import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import MyPhoto from '@components/Profile/MyPhoto';
import PenIcon from '@assets/icons/pen.svg';

const ProfileScreen = () => {
  return (
    <View className="px-5 flex-1 bg-white">
      <View className="h-[220px] flex items-center justify-center">
        <MyPhoto />
        <View className="flex flex-row mt-[8px] items-center">
          <Text className="text-black900 font-UhBee text-3xl">채순</Text>
          <TouchableOpacity className="ml-[3px]">
            <PenIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row gap-[4px]">
        <View />
      </View>
    </View>
  );
};

export default ProfileScreen;
