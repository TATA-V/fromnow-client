export interface Team {
  id: number;
  title: string;
  photoUrls: string[];
  createdAt: string;
  recivedAt: string;
  isNew?: boolean;
}

export interface TeamInvite {
  diaryId: number;
  profileNames: string[];
}

export interface TeamImmediateInvite {
  diaryId: number;
  profileName: string;
}

export interface TeamMenu {
  memberId: number;
  profileName: string;
  photoUrl: string;
  owner: boolean;
  friend: boolean;
}
