import { instance } from '@api/axiosInstance';

export const getOne = async (idToken: string) => {
  const query = new URLSearchParams({ id_token: idToken });
  const res = await instance.get(`/api/oauth2/google?${query}`);
  return res;
};
