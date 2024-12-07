import * as RootNavi from '@utils/rootNavigation';
import useAppState from '@store/useAppStore';
import { Linking } from 'react-native';

const parseQueryParams = (query: string, isDeepLink = false) => {
  if (!query) return isDeepLink ? '' : {};

  return query.split('&').reduce(
    (acc, param) => {
      const [key, value] = param.split('=');
      if (key && value) {
        const decodedValue = decodeURIComponent(value);
        if (isDeepLink) {
          acc += `/${decodedValue}`;
        } else {
          acc[key] = decodedValue;
        }
      }
      return acc;
    },
    isDeepLink ? '' : {},
  );
};

export const navigateByPath = (url: string) => {
  if (!url) return;
  const [path, query] = url.split('?');
  const paramsObj = parseQueryParams(query);
  RootNavi.navigate(path, paramsObj);
};

export const deepLinkByPath = async (url: string) => {
  if (!url) return;
  const [path, query] = url.split('?');
  const newPath = path.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const params = parseQueryParams(query, true);
  await Linking.openURL(`fromnow://${newPath}${params}`);
};

export const extractDeepLink = (url: string) => {
  if (!url) return;
  useAppState.getState().setIsFirstEntry(false);
  const deepLinkMatch = url.match(/[?&]deepLink=([^&]+)/);
  return deepLinkMatch && deepLinkMatch[1] ? deepLinkMatch[1] : null;
};
