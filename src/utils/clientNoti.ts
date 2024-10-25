import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventDetail, AndroidImportance } from '@notifee/react-native';
import { deepLinkByPath } from '@utils/pathHandler';
import useSelectedTeamStore, { SelectedTeam } from '@store/useSelectedTeamStore';
import { getStorage, setStorage } from '@utils/storage';

export interface Notice {
  id: string | number;
  imgUrl: string;
  path: string;
  content: string;
}

export const clientNotiMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  const data = message.data;
  const { title, body, id, path, imgUrl } = data;
  console.log('data:', data);
  const noticeId = id?.toString() || new Date().getTime().toString();
  console.log('noticeId:', noticeId);

  const channelId = await notifee.createChannel({
    id: noticeId,
    name: title.toString(),
    importance: AndroidImportance.HIGH,
    sound: 'sound',
  });
  const newNotice = {
    id: noticeId,
    imgUrl: imgUrl?.toString(),
    path: path?.toString(),
    content: body?.toString(),
  };
  let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
  noticeStorage.unshift(newNotice);
  await setStorage('notice', JSON.stringify(noticeStorage));

  return notifee.displayNotification({
    id: noticeId,
    data,
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
  const { id: noticeId, path, team } = data;

  if (team) {
    const { id, title, createdAt, recivedAt, targetDate } = team as SelectedTeam;
    useSelectedTeamStore.getState().setSelectedTeam({ id, title, createdAt, recivedAt, targetDate });
  }
  let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
  noticeId && (noticeStorage = noticeStorage.filter(item => item.id !== noticeId));
  await setStorage('notice', JSON.stringify(noticeStorage));

  path && (await deepLinkByPath(path.toString()));
};
