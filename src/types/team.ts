export enum DiaryType {
  PERSONAL = 'PERSONAL',
  SHARE = 'SHARE',
}

export interface Team {
  id: number;
  title: string;
  diaryType: DiaryType;
}

export interface TeamInvite {
  diaryId: number;
  diaryType: DiaryType;
}
