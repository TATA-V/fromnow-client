import { instance } from '@api/axiosInstance';

export const getOne = async (date: string) => {
  const query = new URLSearchParams({ date });
  const res = await instance.get(`/api/mission?${query}`);
  return res.data.data || [];
};
