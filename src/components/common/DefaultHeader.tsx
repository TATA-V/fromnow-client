import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import { removeStorageAll } from '@utils/storage';
import { navigateByPath } from '@utils/pathHandler';
import useUserStore from '@store/useUserStore';

interface Props {
  title: string;
  path?: string;
  isSignup?: boolean;
  customStyle?: StyleProp<ViewStyle>;
}

const DefaultHeader = ({ title, path, isSignup, customStyle }: Props) => {
  const { navigation } = useNavi();
  const userReset = useUserStore(state => state.reset);

  const goBack = async () => {
    if (path) {
      navigateByPath(path);
      return;
    }
    if (isSignup) {
      await removeStorageAll();
      userReset();
      navigation.navigate('SignIn');
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={customStyle} className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <TouchableOpacity onPress={goBack} className="w-[44px] h-[44px] p-[10px]">
        <LeftArrowIcon />
      </TouchableOpacity>
      <Text className="text-black900 text-base font-PTDSemiBold">{title}</Text>
      <View className="w-[44px] h-[44px]" />
    </View>
  );
};

export default DefaultHeader;
