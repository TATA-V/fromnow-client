import React from 'react';
import LottieView from 'lottie-react-native';
import splashJson from '@assets/json/splash.json';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  customStyle?: StyleProp<ViewStyle>;
}

const SplashLottie = ({ customStyle }: Props) => {
  return <LottieView style={customStyle} source={splashJson} autoPlay loop />;
};

export default SplashLottie;
