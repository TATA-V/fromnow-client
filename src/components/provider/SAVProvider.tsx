import React, { ReactNode, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Linking } from 'react-native';
import useNavi from '@hooks/useNavi';
import { getStorage } from '@utils/storage';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { clientNotiClick, clientNotiMessage } from '@utils/clientNoti';
import notifee, { EventType } from '@notifee/react-native';
import ModalManager from '@components/Modal/ModalManager';

interface Props {
  children: ReactNode;
  isDarkMode?: boolean;
}

function SAVProvider({ children, isDarkMode = false }: Props) {
  const { navigation } = useNavi();

  useEffect(() => {
    const getFCMToken = async () => {
      const access = await getStorage('access');
      console.log('access:', access);
      if (!access) {
        navigation.navigate('SignIn');
        return;
      }
      const token = await messaging().getToken();
      console.log('token:', token);
    };
    getFCMToken();

    // Quit 알림
    const initialNotification = async () => {
      const initial: FirebaseMessagingTypes.RemoteMessage | null = await messaging().getInitialNotification();
      if (!initial) return;
      const { data } = initial;
      // deep link 경로이동 해줘야함
      // Linking.openURL()
    };
    initialNotification();

    const requestNotifeePermission = async () => {
      await notifee.requestPermission();
    };
    requestNotifeePermission();

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
    };
  }, []);

  return (
    <ModalManager>
      <SafeAreaView className="flex-1 w-full">
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1C1C1E' : '#fff'} />
        {children}
      </SafeAreaView>
    </ModalManager>
  );
}

export default SAVProvider;
