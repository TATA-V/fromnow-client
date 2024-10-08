import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
export const isTablet = width >= 768;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
