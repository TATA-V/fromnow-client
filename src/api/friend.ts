import { instance } from '@api/axiosInstance';

export const getSearchFriend = async () => {
  const res = await instance.get('/api/friend/search');
  return res.data;
};

export const postFriendRequest = async (sentProfileName: string) => {
  const res = await instance.post(`/api/friend/sent`, { sentProfileName });
  return res;
};

export const postFriendAccept = async (acceptMemberId: number) => {
  const res = await instance.post(`/api/friend/accept`, { acceptMemberId });
  return res;
};
