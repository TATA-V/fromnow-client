export interface Team {
  id: number;
  title: string;
  photoUrls: string[];
  isNew?: boolean;
}

export interface TeamInvite {
  diaryId: number;
  profileName: string;
}
