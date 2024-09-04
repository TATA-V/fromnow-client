import { instance } from '@api/axiosInstance';

export const getAll = async () => {
  const res = await instance.get('/api/diary/overview');
  return res.data;
};

export const getOne = async (id: number) => {
  const res = await instance.get(`/api/diary/overview/${id}`);
  return res.data;
};
