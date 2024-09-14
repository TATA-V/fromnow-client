import React, { ReactNode, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Linking } from 'react-native';
import useNavi from '@hooks/useNavi';

interface Props {
  children: ReactNode;
  isDarkMode?: boolean;
}

function SAVProvider({ children, isDarkMode = false }: Props) {
  const { navigation } = useNavi();

  const parseQueryParams = (query: string) => {
    const paramsObj = {};
    const paramsArray = query.split('&');
    paramsArray.forEach(param => {
      const [key, value] = param.split('=');
      if (key && value) {
        paramsObj[key] = decodeURIComponent(value);
      }
    });
    return paramsObj;
  };

  const navigateByDeepLink = (e: { url: string }) => {
    let { url } = e;
    if (!url) return;
    const [path, query] = url.replace(/.*?:\/\//g, '').split('?');
    let paramsObj = {};
    if (query) {
      paramsObj = parseQueryParams(query);
    }
    navigation.navigate(path, paramsObj);
  };

  useEffect(() => {
    // 앱이 처음 시작됐을 때
    Linking.getInitialURL().then(url => {
      navigateByDeepLink({ url });
    });
    // 이미 앱이 실행중일 때
    const linking = Linking.addEventListener('url', navigateByDeepLink);

    return () => {
      linking.remove();
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 w-full">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1C1C1E' : '#fff'} />
      {children}
    </SafeAreaView>
  );
}

export default SAVProvider;
