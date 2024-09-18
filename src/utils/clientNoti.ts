import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { EventDetail } from '@notifee/react-native';

export const clientNotiMessage = (message: FirebaseMessagingTypes.RemoteMessage) => {
  const { data } = message;
  console.log('noti data:', data);

  // return notifee.displayNotification({
  //   title: data.title.toString(),
  //   body: data.content.toString(),
  //   data: data,
  // });
};

export const clientNotiClick = async (detail: EventDetail) => {
  const messageType = detail.notification?.data?.messageType;
  const data = detail.notification?.data;
  // 여기에 어디 화면으로 이동할지에 대한 로직 작성 필요
  // Linking.openURL()
};
