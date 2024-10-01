import { Image as ImageType } from 'react-native-image-crop-picker';

export interface Board {
  boardId: number;
  createdDate: string;
  profilePhotoUrl: string;
  profileName: string;
  contentPhotoUrl: string;
  content: string;
}

export interface ChooseDiaryDto {
  content: string;
  diaryIds: number[];
}

export interface CreateBoard {
  uploadPhotos: ImageType;
  chooseDiaryDto: ChooseDiaryDto;
}
