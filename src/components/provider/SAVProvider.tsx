import React, { ReactNode, useEffect } from 'react';
import { Linking, SafeAreaView, StatusBar } from 'react-native';
import useNavi from '@hooks/useNavi';
import { getStorage } from '@utils/storage';
import messaging from '@react-native-firebase/messaging';
import { clientNotiClick, clientNotiMessage } from '@utils/clientNoti';
import notifee, { EventType } from '@notifee/react-native';
import ModalManager from '@components/Modal/ModalManager';
import ToastModalManager from '@components/Modal/ToastModalManager';
import useGetFCMToken from '@hooks/useGetFCMToken';
import useClearAllUserData from '@hooks/useClearAllUserData';
import useAppState from '@store/useAppStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { extractDeepLink } from '@utils/pathHandler';
import BootSplash from 'react-native-bootsplash';

interface Props {
  children: ReactNode;
}

function SAVProvider({ children }: Props) {
  const { navigation } = useNavi();
  const { getFCMToken } = useGetFCMToken();
  const clearAllUserData = useClearAllUserData();
  const isFirstEntry = useAppState(state => state.isFirstEntry);

  useEffect(() => {
    const initialURL = async () => {
      const url = await Linking.getInitialURL();
      const link = extractDeepLink(url);
      if (!link) return;
      await BootSplash.hide({ fade: true });
      await Linking.openURL(link);
    };
    initialURL();
    const linkingListener = Linking.addEventListener('url', e => {
      const { url } = e;
      const link = extractDeepLink(url);
      if (!link) return;
      Linking.openURL(link);
    });

    const initializeUser = async () => {
      const access = await getStorage('access');
      if (!access && !isFirstEntry) {
        await clearAllUserData();
        navigation.navigate('SignIn');
        return;
      }
      await getFCMToken();
    };
    initializeUser();

    const initializePushNoti = async () => {
      await notifee.requestPermission();
    };
    initializePushNoti();

    // Foreground 알림
    const unsubscribe = messaging().onMessage(clientNotiMessage);

    // Noti(클라이언트 알림 클릭시)
    const foregroundEventListener = notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        await clientNotiClick(detail);
      } else if (type === EventType.DISMISSED) {
        notifee.cancelNotification(detail.notification.id);
        notifee.cancelDisplayedNotification(detail.notification.id);
      }
    });

    // 알림 ios 권한 요청
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission({ providesAppNotificationSettings: true });
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    };
    requestUserPermission();

    return () => {
      unsubscribe();
      foregroundEventListener();
      linkingListener.remove();
    };
  }, []);

  return (
    <ToastModalManager>
      <ModalManager>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 w-full">
            <StatusBar barStyle={isFirstEntry ? 'light-content' : 'dark-content'} backgroundColor={isFirstEntry ? '#1C1C1E' : '#fff'} />
            {children}
          </SafeAreaView>
        </SafeAreaProvider>
      </ModalManager>
    </ToastModalManager>
  );
}

export default SAVProvider;
