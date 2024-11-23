import React, { ReactNode, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import useNavi from '@hooks/useNavi';
import { getStorage, removeStorageAll } from '@utils/storage';
import messaging from '@react-native-firebase/messaging';
import { clientNotiClick, clientNotiMessage } from '@utils/clientNoti';
import notifee, { EventType } from '@notifee/react-native';
import ModalManager from '@components/Modal/ModalManager';
import ToastModalManager from '@components/Modal/ToastModalManager';
import useUserStore from '@store/useUserStore';
import useGetFCMToken from '@hooks/useGetFCMToken';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  children: ReactNode;
  isDarkMode?: boolean;
}

function SAVProvider({ children, isDarkMode = false }: Props) {
  const setName = useUserStore(state => state.setName);
  const { navigation } = useNavi();
  const { getFCMToken } = useGetFCMToken();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initializeUser = async () => {
      const access = await getStorage('access');
      const name = await getStorage('name');
      if (!access) {
        await queryClient.invalidateQueries();
        await removeStorageAll();
        navigation.navigate('SignIn');
        return;
      }
      name && setName(name);
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
    };
  }, []);

  return (
    <ToastModalManager>
      <ModalManager>
        <SafeAreaView className="flex-1 w-full">
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1C1C1E' : '#fff'} />
          {children}
        </SafeAreaView>
      </ModalManager>
    </ToastModalManager>
  );
}

export default SAVProvider;
