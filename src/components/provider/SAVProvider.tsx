import React, { ReactNode, useEffect } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import useNavi from '@hooks/useNavi';
import { getStorage, setStorage } from '@utils/storage';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { clientNotiClick, clientNotiMessage, Notice } from '@utils/clientNoti';
import notifee, { EventType } from '@notifee/react-native';
import ModalManager from '@components/Modal/ModalManager';
import ToastModalManager from '@components/Modal/ToastModalManager';
import useUserStore from '@store/useUserStore';
import { postFCM } from '@api/user';
import useSelectedTeamStore, { SelectedTeam } from '@store/useSelectedTeamStore';
import { deepLinkByPath } from '@utils/pathHandler';

interface Props {
  children: ReactNode;
  isDarkMode?: boolean;
}

function SAVProvider({ children, isDarkMode = false }: Props) {
  const setName = useUserStore(state => state.setName);
  const setSelectedTeam = useSelectedTeamStore(state => state.setSelectedTeam);
  const { navigation } = useNavi();

  useEffect(() => {
    const getFCMToken = async () => {
      const access = await getStorage('access');
      const name = await getStorage('name');
      console.log('access:', access);
      if (!access) {
        navigation.navigate('SignIn');
        return;
      }
      name && setName(name);
      const token = await messaging().getToken();
      const res = await postFCM(token);
      console.log('token:', res);
    };
    getFCMToken();

    // Quit 알림
    const initialNotification = async () => {
      const initial: FirebaseMessagingTypes.RemoteMessage | null = await messaging().getInitialNotification();
      if (!initial) return;
      const { data } = initial;
      const { body, path, imgUrl, team } = data;
      const noticeId = data?.id?.toString() || new Date().getTime().toString();
      if (team) {
        const { id, title, createdAt, recivedAt, targetDate } = team as SelectedTeam;
        setSelectedTeam({ id, title, createdAt, recivedAt, targetDate });
      }
      const newNotice = {
        id: noticeId,
        imgUrl: imgUrl?.toString(),
        path: path?.toString(),
        content: body?.toString(),
      };
      let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
      noticeStorage.unshift(newNotice);
      await setStorage('notice', JSON.stringify(noticeStorage));

      path && deepLinkByPath(path.toString());
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
    notifee.onBackgroundEvent(async ({ type, detail }) => {
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
