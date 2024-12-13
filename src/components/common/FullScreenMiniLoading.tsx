import React, { ReactNode } from 'react';
import { View } from 'react-native';
import MiniLoading from '@components/common/MiniLoading';

interface Props {
  bgColor?: string;
  translateY?: string;
  children?: ReactNode;
}

const FullScreenMiniLoading = ({ bgColor = '#FBFBFD', translateY = '-66px', children }: Props) => {
  return (
    <View style={{ backgroundColor: bgColor }} className="flex-1 h-full justify-center items-center">
      <View style={{ transform: `translateY(${translateY})` }}>
        <MiniLoading />
        {children}
      </View>
    </View>
  );
};

export default FullScreenMiniLoading;
