import { CreateBoard } from '@clientTypes/board';
import { instance } from '@api/axiosInstance';

export interface GetAll {
  diaryId: number;
  date: string;
}

export const getAll = async (data: GetAll) => {
  const { diaryId, date } = data;
  const query = new URLSearchParams({ date });
  const res = await instance.get(`/api/board/diaries/${diaryId}?${query}`);
  return res.data;
};

export const postOne = async (body: CreateBoard) => {
  const { diaryId, uploadPhotos, createDiaryDto } = body;

  const formData = new FormData();
  uploadPhotos.forEach((image, idx) => {
    formData.append(`uploadPhotos[${idx}]`, {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    });
  });
  formData.append('createDiaryDto', JSON.stringify(createDiaryDto));

  const res = await instance.post(`/api/board/diaries/${diaryId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

export const postLike = async (diaryId: number) => {
  const res = await instance.post(`api/board/${diaryId}/like`);
  return res;
};

export const postDisLike = async (diaryId: number) => {
  const res = await instance.post(`api/board/${diaryId}/dislike`);
  return res;
};
