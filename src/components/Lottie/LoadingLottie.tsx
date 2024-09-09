import React from 'react';
import LottieView from 'lottie-react-native';
import loadingJson from '@assets/json/loading.json';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  customStyle?: StyleProp<ViewStyle>;
}

const LoadingLottie = ({ customStyle }: Props) => {
  return <LottieView style={customStyle} source={loadingJson} autoPlay loop />;
};

export default LoadingLottie;
