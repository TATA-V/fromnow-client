import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import useNavi from '@hooks/useNavi';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import CycleIcon from '@assets/icons/cycle.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isAndroid } from '@utils/deviceInfo';

interface Props {
  toggleCameraType: () => void;
}

const CameraHeader = ({ toggleCameraType }: Props) => {
  const { navigation } = useNavi();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    if (!navigation.canGoBack()) {
      navigation.navigate('Bottom', { screen: 'Home' });
      return;
    }
    navigation.goBack();
  };

  return (
    <View style={{ top: isAndroid ? insets.top : 0 }} className="absolute px-[8px] h-[66px] w-full flex flex-row items-center justify-between">
      <TouchableOpacity onPress={goBack} className="w-[44px] h-[44px] p-[10px]">
        <LeftArrowIcon color="#fff" />
      </TouchableOpacity>
      <Text className="text-white text-base font-PTDSemiBold">카메라 촬영</Text>
      <TouchableOpacity onPress={toggleCameraType} className="w-[44px] h-[44px] p-[12px]">
        <CycleIcon />
      </TouchableOpacity>
    </View>
  );
};

export default CameraHeader;
