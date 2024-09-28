export interface MyProfile {
  profileName: string;
  photoUrl: string;
}

export interface MyLikedPost {
  boardId: number;
  createdDate: string;
  profilePhotoUrl: string;
  profileName: string;
  contentPhotoUrl: string[];
  content: string;
}

export interface MyFriend {
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
