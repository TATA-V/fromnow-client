import * as RootNavi from '@utils/rootNavigation';
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

export const navigateByNoticeLink = (url: string) => {
  if (!url) return;
  const [path, query] = url.split('?');
  const paramsObj = parseQueryParams(query);
  RootNavi.navigate(path, paramsObj);
};

export const deepLinkByNoticeLink = (url: string) => {
  if (!url) return;
  const [path, query] = url.split('?');
  const newPath = path.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const params = parseQueryParams(query, true);
  Linking.openURL(`fromnow://${newPath}${params}`);
};
