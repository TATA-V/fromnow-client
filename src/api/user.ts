import { instance } from '@api/axiosInstance';
import { getStorage } from '@utils/storage';
import axios from 'axios';
import { BASE_URL } from '@env';

export interface GetOne {
  path: string;
  token: string;
}

export const getOne = async ({ path, token }: GetOne) => {
  const query = new URLSearchParams({ id_token: token });
  const res = await instance.get(`/api/oauth2/${path}?${query}`);
  return res;
};

export const updateNickname = async (profileName: string) => {
  console.log({ profileName });
  const access = await getStorage('access');
  console.log('getStorage:', access);
  const headers = { Authorization: access };

  const res = await axios.post(`${BASE_URL}/api/member/profileName`, { profileName }, { headers, withCredentials: true });
  // const res = await instance.post(`/api/member/profileName`, { profileName });
  return res;
};

export const updatePhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('uploadPhoto', file);
  const res = await instance.post(`/api/member/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: (data, headers) => {
      return data;
    },
  });
  return res;
};
