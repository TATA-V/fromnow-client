import { Team } from './team';
import { Image as ImageType } from 'react-native-image-crop-picker';

export interface Board {
  boardId: number;
  createdDate: string;
  profilePhotoUrl: string;
  profileName: string;
  contentPhotoUrl: string[];
  content: string;
}

export interface CreateBoard {
  diaryId: number;
  uploadPhotos: ImageType;
  createDiaryDto: Omit<Team, 'id'>;
}