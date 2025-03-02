import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { EventDetail, AndroidImportance } from '@notifee/react-native';
import { deepLinkByPath } from '@utils/pathHandler';
import useSelectedTeamStore, { SelectedTeam } from '@store/useSelectedTeamStore';
import { getStorage, setStorage } from '@utils/storage';
import useAppState from '@store/useAppStore';
import { isKo } from '@utils/localize';

export interface Notice {
  id: string | number;
  imgUrl: string;
  path: string;
  content: string;
}

export const clientNotiMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  const data = message.data;
  const { title: dataTitle, body: dataBody, id, path, imgUrl, mission } = data;
  const noticeId = id?.toString() || new Date().getTime().toString();

  const missionTitle = isKo() ? '❤️두근두근 프나타임❤️' : '❤️Heart-Pounding Fun Time❤️';
  const missionBody = isKo() ? '지금 이 순간, 당신의 일상을 들려주세요!' : 'Share your everyday life with us, right now!';
  const title = mission ? missionTitle : dataTitle?.toString();
  const body = missionBody ? missionBody : dataBody?.toString();

  const channelId = await notifee.createChannel({
    id: noticeId,
    name: title?.toString(),
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
    body,
    title,
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
  useAppState.getState().setIsFirstEntry(false);
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
