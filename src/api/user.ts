import { instance } from '@api/axiosInstance';
import { Image as ImageType } from 'react-native-image-crop-picker';

export const getOne = async () => {
  const res = await instance.get('/api/my/profile');
  return res.data.data;
};

export const updateNickname = async (profileName: string) => {
  const res = await instance.post(`/api/member/profileName`, { profileName });
  return res.data;
};

export const updatePhoto = async (image: ImageType) => {
  const formData = new FormData();
  if (image) {
    formData.append('uploadPhoto', {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    });
  } else {
    formData.append('uploadPhoto', null);
  }
  const res = await instance.post(`/api/member/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getAllMyLikedBoard = async () => {
  const res = await instance.get('/api/my/likes');
  return res.data.data;
};

export const getAllMyFriend = async () => {
  const res = await instance.get('/api/my/friend/mutual');
  return res.data.data;
};

export const getAllMyFriendRequest = async () => {
  const res = await instance.get('/api/my/friend/requests/received');
  return res.data.data;
};

export const getAllMyTeamRequest = async () => {
  const res = await instance.get('/api/my/diary/requests/received');
  return res.data.data;
};

export const postFCM = async (fcmToken: string) => {
  const res = await instance.post('/api/member/fcm', { fcmToken });
  return res.data.data;
};

export const deleteOne = async () => {
  const res = await instance.delete('/api/member/withdraw');
  return res.data.data;
};

export const logout = async () => {
  const res = await instance.post('/api/member/logout');
  return res.data.data;
};
