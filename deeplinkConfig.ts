import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['fromnow://'],
  config: {
    screens: {
      Splash: 'splash',
      Home: 'home/:path',
      Profile: 'profile',
      SignIn: 'signin',
      Camera: 'camera',
      SignupNickname: 'signup-nickname',
      SignupPhoto: 'signup-photo',
      MyFriend: 'my-friend/:req',
      MyTeamRequest: 'my-team-request',
      MyLikedBoard: 'my-liked-board',
      Team: 'team/:id',
      TeamCalendar: 'team-calendar',
      TeamEdit: 'team-edit/:id',
      TeamFriendAdd: 'team-friend-add/:id',
      TeamDetail: 'team-detail/:teamId/:date',
      TeamCreate: 'team-create',
      BoardEdit: 'board-edit/:file',
      Search: 'search',
      Notice: 'notice',
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
  Splash: string;
  Home: { path?: string };
  Profile: string;
  SignIn: string;
  Camera: string;
  SignupNickname: string;
  SignupPhoto: string;
  MyFriend: { req?: string };
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
  Notice: string;
  PrivacyPolicy: { showSignupPolicy: boolean };
  ServicePolicy: { showSignupPolicy: boolean };
};
