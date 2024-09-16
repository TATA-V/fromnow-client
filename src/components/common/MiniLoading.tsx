import React from 'react';
import { View } from 'react-native';
import LoadingLottie from '@components/Lottie/LoadingLottie';

const MiniLoading = () => {
  return (
    <View className="w-full items-center">
      <LoadingLottie customStyle={{ width: 130, height: 130 }} />
    </View>
  );
};

export default MiniLoading;
