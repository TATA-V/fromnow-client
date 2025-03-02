import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getLocales } from 'react-native-localize';

import en from './en.json';
import ko from './ko.json';

const resources = {
  en: {
    translation: en,
  },
  ko: {
    translation: ko,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  supportedLngs: ['en', 'ko'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
