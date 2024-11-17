import { postFCM } from '@api/user';
import messaging from '@react-native-firebase/messaging';

const useGetFCMToken = () => {
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      const res = await postFCM(token);
      return res;
    } catch (e) {}
  };

  return {
    getFCMToken,
  };
};

export default useGetFCMToken;
