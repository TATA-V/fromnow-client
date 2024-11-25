import { getStorage, removeStorageAll, setStorage } from '@utils/storage';
import { BASE_URL } from '@env';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Alert } from 'react-native';
import * as RootNavi from '@utils/rootNavigation';
import useUserStore from '@store/useUserStore';

export const instance = axios.create({
  baseURL: BASE_URL,
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
      config.headers['Authorization'] = access;
    }
    return config;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const tokenAndRequestUpdate = async (config: AxiosRequestConfig) => {
  try {
    const res = await instance('/api/jwt/access-token');
    const access = res.headers.authorization;
    await setStorage('access', access);
    instance.defaults.headers.common['Authorization'] = access;
    config.headers['Authorization'] = access;
    return instance(config);
  } catch (error) {
    return Promise.reject(error);
  }
};

instance.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    // prettier-ignore
    const { config, response: { status, data } } = error;

    if (status === 401 && !config._retry && data.data === 'ACCESS_TOKEN_EXPIRED') {
      config._retry = true;
      return tokenAndRequestUpdate(config);
    } else if (status === 401 && config._retry && data.data === 'REFRESH_TOKEN_EXPIRED') {
      await removeStorageAll();
      useUserStore.getState().reset();
      Alert.alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      RootNavi.navigate('SignIn');
    }

    return Promise.reject(error);
  },
);
