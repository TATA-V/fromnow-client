import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventDetail, AndroidImportance } from '@notifee/react-native';

export const clientNotiMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  if (!message.notification) return;
  const { body, title } = message.notification;
  console.log('message:', message);
  console.log('title:', title);
  console.log('body:', body);

  // 알림 채널 생성
  const channelId = await notifee.createChannel({
    id: 'default222', // data에 id값 가져와서 넣기
    name: '기본 알림 채널',
    importance: AndroidImportance.HIGH,
    sound: 'sound',
  });

  return notifee.displayNotification({
    // id,  // data에 id값 가져와서 넣기
    // data,
    title,
    body,
    android: {
      channelId,
      smallIcon: 'ic_notification',
      sound: 'sound',
      color: '#000000',
    },
    ios: {
      foregroundPresentationOptions: {
        alert: true,
        badge: true,
        sound: true,
      },
    },
  });
};

export const clientNotiClick = async (detail: EventDetail) => {
  const messageType = detail.notification?.data?.messageType;
  const data = detail.notification?.data;
  console.log('messageType:', messageType);
  console.log('data:', data);
  // 여기에 어디 화면으로 이동할지에 대한 로직 작성 필요
  // Linking.openURL()
};
