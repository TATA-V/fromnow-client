export interface Team {
  id: number;
  title: string;
  photoUrls: string[];
  date: string;
  isNew?: boolean;
}

export interface TeamInvite {
  diaryId: number;
  profileName: string;
}
