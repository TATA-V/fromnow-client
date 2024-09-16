import { instance } from '@api/axiosInstance';
import { Image as ImageType } from 'react-native-image-crop-picker';

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

export const getAllMyLikedPost = async () => {
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
