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
      MyLikedBoard: 'my-liked-board',
      Team: 'team/:id/',
      TeamCalendar: 'team-calendar',
      TeamEdit: 'team-edit/:id',
      TeamFriendAdd: 'team-friend-add/:id',
      TeamDetail: 'team-detail/:teamId/:date',
      TeamCreate: 'team-create',
      BoardEdit: 'board-edit/:file',
      Search: 'search',
      Notify: 'notify',
      PrivacyPolicy: 'privacy-policy/:showSignupPolicy',
      ServicePolicy: 'service-policy/:showSignupPolicy',
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
  MyLikedBoard: string;
  Team: { id: string };
  TeamCalendar: string;
  TeamEdit: { id: string };
  TeamFriendAdd: { id: string };
  TeamDetail: { teamId: string; date: string };
  TeamCreate: string;
  BoardEdit: { file: string };
  Search: string;
  Notify: string;
  PrivacyPolicy: { showSignupPolicy: boolean };
  ServicePolicy: { showSignupPolicy: boolean };
};
