import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventDetail, AndroidImportance } from '@notifee/react-native';
import { navigateByNoticeLink } from '@utils/linkHandler';
import useSelectedTeamStore, { SelectedTeam } from '@store/useSelectedTeamStore';
import { getStorage, setStorage } from '@utils/storage';

export interface Notice {
  id: string | number;
  imgUrl: string;
  link: string;
  content: string;
}

export const clientNotiMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  if (!message.notification) return;
  const { body, title } = message.notification;
  const data = message.data;
  console.log('message:', message);
  console.log('title:', title);
  console.log('body:', body);
  console.log('data:', data);
  const noticeId = data?.id?.toString() || new Date().getTime().toString();
  console.log('noticeId:', noticeId);

  const channelId = await notifee.createChannel({
    id: noticeId,
    name: '기본 알림 채널',
    importance: AndroidImportance.HIGH,
    sound: 'sound',
  });
  const newNotice = {
    id: noticeId,
    imgUrl:
      'https://firebasestorage.googleapis.com/v0/b/fromnow-34d51.appspot.com/o/thumbnail.png?alt=media&token=9eb7a5e3-cff9-47d5-9cc3-ba5d54766c15',
    link: 'Profile',
    content: body,
  };
  let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
  noticeStorage.unshift(newNotice);
  await setStorage('notice', JSON.stringify(noticeStorage));

  return notifee.displayNotification({
    id: noticeId,
    data,
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
  const data = detail.notification?.data || {};
  const { id: noticeId, link, team } = data;

  if (team) {
    const { id, title, createdAt, recivedAt, targetDate } = team as SelectedTeam;
    useSelectedTeamStore.getState().setSelectedTeam({ id, title, createdAt, recivedAt, targetDate });
  }
  let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
  noticeId && (noticeStorage = noticeStorage.filter(item => item.id !== noticeId));
  await setStorage('notice', JSON.stringify(noticeStorage));

  link && navigateByNoticeLink(link.toString());
};
