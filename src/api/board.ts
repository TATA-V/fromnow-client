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
  return res.data.data;
};

export const postOne = async (data: CreateBoard) => {
  const { uploadPhotos, chooseDiaryDto } = data;

  const formData = new FormData();
  formData.append('uploadPhotos', {
    uri: uploadPhotos.path,
    type: uploadPhotos.mime,
    name: uploadPhotos.path.split('/').pop(),
  });
  const jsonChooseDiary = JSON.stringify(chooseDiaryDto);
  const chooseDiaryBlob = new Blob([jsonChooseDiary], {
    type: 'application/json',
    lastModified: Date.now(),
  });
  formData.append('chooseDiaryDto', chooseDiaryBlob);

  const res = await instance.post('/api/board/diaries', formData, {
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
