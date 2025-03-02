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
import { isAndroid } from '@utils/deviceInfo';
import useDeviceSize from '@hooks/useDeviceSize';
import Orientation from 'react-native-orientation-locker';
import SpInAppUpdates, { IAUUpdateKind, StartUpdateOptions } from 'sp-react-native-in-app-updates';
import DeviceInfo from 'react-native-device-info';
import 'moment-modification-rn/locale/ko';
import moment from 'moment-modification-rn';
import { isKo } from '@utils/localize';

interface Props {
  children: ReactNode;
}

function SAVProvider({ children }: Props) {
  const { navigation } = useNavi();
  const { getFCMToken } = useGetFCMToken();
  const clearAllUserData = useClearAllUserData();
  const { isTablet } = useDeviceSize();

  const isFirstEntry = useAppState(state => state.isFirstEntry);
  const statusBarBgColor = isFirstEntry ? '#1C1C1E' : '#fff';
  StatusBar.setBarStyle(isFirstEntry ? 'light-content' : 'dark-content');
  StatusBar.setBackgroundColor(statusBarBgColor);

  useEffect(() => {
    if (isKo()) moment.locale('ko');
    else moment.locale('en');

    const curVersion = DeviceInfo.getBuildNumber();
    const inAppUpdates = new SpInAppUpdates(false);
    inAppUpdates.checkNeedsUpdate({ curVersion }).then(result => {
      if (result.shouldUpdate) {
        if (isAndroid) {
          const updateOptions: StartUpdateOptions = {
            updateType: IAUUpdateKind.IMMEDIATE,
          };
          inAppUpdates.startUpdate(updateOptions);
          inAppUpdates.installUpdate();
        }
      }
    });

    if (!isTablet) Orientation.lockToPortrait();
    else Orientation.unlockAllOrientations();

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
      // console.log('authStatus:', authStatus);
      // console.log('enabled:', enabled);
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
        <SafeAreaProvider style={{ flex: 1, width: '100%', backgroundColor: statusBarBgColor }}>
          <SafeAreaView className="flex-1 w-full">
            {isAndroid && <StatusBar />}
            {children}
          </SafeAreaView>
        </SafeAreaProvider>
      </ModalManager>
    </ToastModalManager>
  );
}

export default SAVProvider;
