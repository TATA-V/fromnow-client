import { isWeb } from '@utils/deviceInfo';
import { getStorage, removeStorage } from '@utils/storage';
import { BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';
import useNavi from '@hooks/useNavi';
import useToast from '@hooks/useToast';

export const instance = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const access = await getStorage('access');
    if (access) {
      config.headers.authorization = access;
    }
    return config;
  },
  async (error: AxiosError) => {
    const { showToast } = useToast();
    showToast(`error: ${error}`);
  },
);

instance.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    const { navigate, navigation } = useNavi();
    const { showToast } = useToast();
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 && !config._retry) {
      config._retry = true;
      // refresh 토큰 재발급해야 함. 아직 서버 쪽 구현이 안 되어있음
      return;
    }

    if (status === 401 && config._retry) {
      await removeStorage('access');
      showToast('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      if (isWeb) {
        navigate('/signin');
      }
      if (!isWeb) {
        navigation.navigate('SignIn');
      }
    }

    return Promise.reject(error);
  },
);
