import { CreateBoard } from '@clientTypes/board';
import { instance } from '@api/axiosInstance';
import RNFS from 'react-native-fs';

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
  const jsonString = JSON.stringify(chooseDiaryDto);
  const fileName = 'dto.json';
  const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
  await RNFS.writeFile(filePath, jsonString, 'utf8');
  formData.append('chooseDiaryDto', { uri: `file://${filePath}`, type: 'application/json', name: fileName });

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
