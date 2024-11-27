import { CreateBoard } from '@clientTypes/board';
import { instance } from '@api/axiosInstance';
import RNFS from 'react-native-fs';
import { splitDate } from '@utils/formatDate';
import { Moment } from 'moment-modification-rn';
import { Alert } from 'react-native';

export interface GetAll {
  diaryId: number;
  date: string;
}
export interface RowColCalendar {
  diaryId: number;
  date: Moment | string;
  num?: number;
}
export interface PostRead {
  diaryId: number;
  date: Moment | string;
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

export const postLike = async (boardId: number) => {
  const res = await instance.post(`api/board/${boardId}/like`);
  return res.data.data;
};

export const postDisLike = async (boardId: number) => {
  const res = await instance.post(`api/board/${boardId}/dislike`);
  return res.data.data;
};

export const postRead = async ({ diaryId, date }: PostRead) => {
  const { year, month, day } = splitDate(date);
  const res = await instance.post(`api/diary/${diaryId}/read`, { year, month, day });
  return res.data.data;
};

export const getRowInfiniteCalendar = async ({ diaryId, date }: RowColCalendar) => {
  const { year, month } = splitDate(date.toString());
  const query = new URLSearchParams({ year, month });
  const res = await instance.get(`/api/diary/diaries/${diaryId}/scroll/row?${query}`);
  return res.data.data;
};

export const getColCalendar = async ({ diaryId, date, num = 2 }: RowColCalendar) => {
  const { year, month } = splitDate(date.toString());
  const query = new URLSearchParams({ year, month, num: num.toString() });
  const res = await instance.get(`/api/diary/diaries/${diaryId}/scroll/col?${query}`);
  return res.data.data;
};
