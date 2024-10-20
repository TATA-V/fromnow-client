export interface MyProfile {
  profileName: string;
  photoUrl: string;
}

export interface Friend {
  memberId: number;
  profileName: string;
  profilePhotoUrl: string;
  friend: boolean;
}

export interface MyFriendRequest {
  memberId: number;
  profileName: string;
  profilePhotoUrl: string;
}

export interface MyTeamRequest {
  diaryTitle: string;
  diaryId: number;
}
