import { instance } from '@api/axiosInstance';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { BASE_URL } from '@env';

export interface GetOne {
  path: string;
  token: string;
}

export const getOne = async ({ path, token }: GetOne) => {
  console.log('path:', path);
  console.log('token:', token);
  console.log('BASE_URL:', BASE_URL);
  const query = new URLSearchParams({ id_token: token });
  const res = await instance.get(`/api/oauth2/${path}?${query}`);
  return res;
};

export const updateNickname = async (profileName: string) => {
  const res = await instance.post(`/api/member/profileName`, { profileName });
  return res;
};

export const updatePhoto = async (image: ImageType) => {
  const formData = new FormData();
  formData.append('uploadPhoto', {
    uri: image.path,
    type: image.mime,
    name: image.path.split('/').pop(),
  });
  const res = await instance.post(`/api/member/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
