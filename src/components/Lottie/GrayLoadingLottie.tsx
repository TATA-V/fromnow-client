import React from 'react';
import LottieView from 'lottie-react-native';
import loadingJson from '@assets/json/gray_loading.json';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  customStyle?: StyleProp<ViewStyle>;
}

const GrayLoadingLottie = ({ customStyle = { height: 70 } }: Props) => {
  return <LottieView style={customStyle} source={loadingJson} autoPlay loop />;
};

export default GrayLoadingLottie;
