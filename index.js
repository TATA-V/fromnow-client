/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { clientNotiMessage } from '@utils/clientNoti';
import notifee, { EventType } from '@notifee/react-native';
import { clientNotiClick } from '@utils/clientNoti';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    await clientNotiClick(detail);
  } else if (type === EventType.DISMISSED) {
    notifee.cancelNotification(detail.notification.id);
    notifee.cancelDisplayedNotification(detail.notification.id);
  }
});

// Background 알림
messaging().setBackgroundMessageHandler(clientNotiMessage);

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
