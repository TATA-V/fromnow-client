import { instance } from '@api/axiosInstance';

export interface GetOne {
  path: string;
  token: string;
}

export const getOne = async ({ path, token }: GetOne) => {
  const query = new URLSearchParams({ id_token: token });
  const res = await instance.get(`/api/oauth2/${path}?${query}`);
  return res;
};
