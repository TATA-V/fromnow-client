import { getStorage, removeStorage, setStorage } from '@utils/storage';
import { BASE_URL } from '@env';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { Alert } from 'react-native';
import * as RootNavi from '@utils/rootNavigation';

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
      config.headers['Authorization'] = access;
    }
    return config;
  },
  async (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const tokenAndRequestUpdate = async (config: AxiosRequestConfig) => {
  const res = await instance.get('/api/jwt/access-token');
  const access = res.headers.authorization;
  console.log('update access:', access);
  await setStorage('access', access);
  instance.defaults.headers.common['Authorization'] = access;
  return instance(config);
};

instance.interceptors.response.use(
  res => {
    return res;
  },
  async error => {
    // prettier-ignore
    const { config, response: { status, data } } = error;
    console.log('interceptor data:', data);
    console.log('interceptor data.data:', data.data);

    if (status === 401 && !config._retry && data.data === 'ACCESS_TOKEN_EXPIRED') {
      config._retry = true;
      console.log('data:', data);
      console.log('data.data:', data.data);
      return tokenAndRequestUpdate(config);
    }

    if (status === 401 && config._retry && data.data === 'REFRESH_TOKEN_EXPIRED') {
      await removeStorage('access');
      console.log('data refresh:', data);
      console.log('data.data refresh:', data.data);
      Alert.alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      RootNavi.navigate('SignIn');
    }

    return Promise.reject(error);
  },
);
