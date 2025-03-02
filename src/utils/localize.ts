import * as RNLocalize from 'react-native-localize';

export const isKo = () => {
  const languageCode = RNLocalize.getLocales()[0]?.languageCode;
  return languageCode === 'ko';
};

export const isEn = () => {
  const languageCode = RNLocalize.getLocales()[0]?.languageCode;
  return languageCode === 'en';
};
