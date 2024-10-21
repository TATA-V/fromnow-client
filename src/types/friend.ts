export interface Friend {
  memberId: number;
  profileName: string;
  profilePhotoUrl: string;
  friend: boolean;
}

export interface TeamFriend {
  memberId: 0;
  profileName: string;
  profilePhotoUrl: string;
  team: boolean;
}
