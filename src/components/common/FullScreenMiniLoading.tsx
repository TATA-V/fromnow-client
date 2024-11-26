import React from 'react';
import { View } from 'react-native';
import MiniLoading from '@components/common/MiniLoading';

interface Props {
  bgColor?: string;
  translateY?: string;
}

const FullScreenMiniLoading = ({ bgColor = '#FBFBFD', translateY = '-66px' }: Props) => {
  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 h-full justify-center items-center">
      <View style={{ transform: `translateY(${translateY})` }}>
        <MiniLoading />
      </View>
    </View>
  );
};

export default FullScreenMiniLoading;
