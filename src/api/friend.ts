import { instance } from '@api/axiosInstance';

export interface GetSearchTeamFriend {
  diaryId: number;
  profileName: string;
}

export const getSearchFriend = async (profileName: string) => {
  const query = new URLSearchParams({ profileName });
  const res = await instance.get(`/api/friend/search?${query}`);
  return res.data.data;
};

export const getSearchTeamFriend = async ({ diaryId, profileName }: GetSearchTeamFriend) => {
  const query = new URLSearchParams({ profileName });
  const res = await instance.get(`/api/diary/${diaryId}/search?${query}`);
  return res.data.data || [];
};

export const postFriendRequest = async (sentProfileName: string) => {
  const res = await instance.post('/api/friend/sent', { sentProfileName });
  return res;
};

export const postFriendReject = async (rejectedMemberId: number) => {
  const res = await instance.post('/api/friend/reject', { rejectedMemberId });
  return res.data;
};

export const postFriendAccept = async (acceptMemberId: number) => {
  const res = await instance.post('/api/friend/accept', { acceptMemberId });
  return res.data;
};

export const deleteFriend = async (deleteId: number) => {
  const res = await instance.delete('/api/friend/delete', { data: { deleteId } });
  return res.data;
};
