import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['fromnow://'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'profile',
      SignIn: 'signin',
      Camera: 'camera',
      SignupNickname: 'signup-nickname',
      SignupPhoto: 'signup-photo',
      MyFriend: 'my-friend',
      MyTeamRequest: 'my-team-request',
      MyLikedPost: 'my-liked-post',
      Team: 'team/:id',
      TeamCalendar: 'team-calendar/:id',
      TeamSetting: 'team-setting/:id',
      TeamEdit: 'team-edit/:id',
      TeamFriendAdd: 'team-friend-add/:id',
      TeamDetail: 'team-detail/:teamId/:date',
      TeamCreate: 'team-create',
      PostEdit: 'post-edit/:file',
      Search: 'search',
      Notify: 'notify',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};

type RootStackParamList = {
  Home: string;
  Profile: string;
  SignIn: string;
  Camera: string;
  SignupNickname: string;
  SignupPhoto: string;
  MyFriend: string;
  MyTeamRequest: string;
  MyLikedPost: string;
  Team: { id: string };
  TeamCalendar: { id: string };
  TeamSetting: { id: string };
  TeamEdit: { id: string };
  TeamFriendAdd: { id: string };
  TeamDetail: { teamId: string; date: string };
  TeamCreate: string;
  PostEdit: { file: string };
  Search: string;
  Notify: string;
};
