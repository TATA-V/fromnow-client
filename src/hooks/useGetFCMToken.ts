import { postFCM } from '@api/user';
import messaging from '@react-native-firebase/messaging';

const useGetFCMToken = () => {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      const res = await postFCM(token);
      console.log('fcm:', res);
      return res;
    } catch (e) {
      console.log('error fcm', e);
    }
  };

  return {
    getFCMToken,
  };
};

export default useGetFCMToken;
