import React from 'react';
import { View, Text } from 'react-native';
import CameraIcon from '@assets/icons/CameraIcon';
import BellIcon from '@assets/icons/BellIcon';
import FolderIcon from '@assets/icons/FolderIcon';

const PermissionInfo = () => {
  return (
    <View className="pt-4 pb-5 px-2 w-full space-y-6">
      <View className="flex-row items-center space-x-4">
        <CameraIcon color="#8EB9E6" />
        <View>
          <Text className="text-black900 text-sm font-PTDSemiBold">카메라</Text>
          <Text className="text-black700 text-sm font-PTDLight pt-[1px]">사진 촬영</Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-4">
        <FolderIcon size={32} />
        <View className="flex">
          <Text className="text-black900 text-sm font-PTDSemiBold ">사진 및 파일</Text>
          <Text className="text-black700 text-sm font-PTDLight pt-[1px]">미디어 업로드 및 저장</Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-4">
        <BellIcon width={32} height={32} color="#FEE987" />
        <View className="flex">
          <Text className="text-black900 text-sm font-PTDSemiBold ">알림</Text>
          <Text className="text-black700 text-sm font-PTDLight pt-[1px]">새로운 소식과 알림 수신</Text>
        </View>
      </View>
    </View>
  );
};

export default PermissionInfo;
