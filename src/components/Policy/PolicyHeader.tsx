import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import XIcon from '@assets/icons/x.svg';
import useNavi from '@hooks/useNavi';
import { SheetManager } from 'react-native-actions-sheet';
import usePolicyStore from '@store/usePolicyStore';

interface Props {
  title: string;
}

const PolicyHeader = ({ title }: Props) => {
  const { navigation } = useNavi();
  const setAnimated = usePolicyStore(state => state.setAnimated);

  const goBack = () => {
    navigation.goBack();
    setAnimated(false);
    SheetManager.show('signup-policy');
  };

  return (
    <View className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <TouchableOpacity onPress={goBack} className="w-[48px] h-[48px] p-[12px]">
        <XIcon />
      </TouchableOpacity>
      <Text className="text-black900 text-base font-PTDSemiBold">{title}</Text>
      <View className="w-[44px] h-[44px]" />
    </View>
  );
};

export default PolicyHeader;
