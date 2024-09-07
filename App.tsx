import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KAKAO_NATIVE_APP_KEY } from '@env';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import '@components/BottomSheet/sheets';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import RQProvider from '@components/provider/RQProvider';
import ToastNotiProvider from '@components/provider/ToastProvider';
import SAVProvider from '@components/provider/SAVProvider';

import BottomTabBar from '@components/BottomNavi/BottomTabBar';
import DefaultHeader from '@components/common/DefaultHeader';
import ProfileHeader from '@components/Profile/ProfileHeader';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignupNicknameScreen from './src/screens/SignupNicknameScreen';
import SignupPhotoScreen from './src/screens/SignupPhotoScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyFriendScreen from './src/screens/MyFriendScreen';
import MyTeamScreen from './src/screens/MyTeamScreen';
import NotifyScreen from './src/screens/NotifyScreen';
import TeamScreen from './src/screens/TeamScreen';
import TeamCalendarScreen from './src/screens/TeamCalendarScreen';
import TeamSettingScreen from './src/screens/TeamSettingScreen';
import TeamEditScreen from './src/screens/TeamEditScreen';
import MyLikedPostScreen from './src/screens/MyLikedPostScreen';

function App() {
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={() => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarShown: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ header: () => <ProfileHeader /> }} />
      </Tab.Navigator>
    );
  };

  const Stack = createNativeStackNavigator();

  initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RQProvider>
        <ToastNotiProvider>
          <NavigationContainer>
            <SheetProvider>
              <SAVProvider>
                <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
                  {/* <Stack.Screen name="Bottom" component={BottomTabScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                  <Stack.Screen
                    name="SignupNickname"
                    component={SignupNicknameScreen}
                    options={{ header: () => <DefaultHeader title="회원가입" />, contentStyle: { backgroundColor: '#fff' } }}
                  />
                  <Stack.Screen
                    name="SignupPhoto"
                    component={SignupPhotoScreen}
                    options={{ header: () => <DefaultHeader title="회원가입" />, contentStyle: { backgroundColor: '#fff' } }}
                  /> */}
                  <Stack.Screen
                    name="MyFriend"
                    component={MyFriendScreen}
                    options={{ header: () => <DefaultHeader title="내 친구" customStyle={{ backgroundColor: '#FBFBFD' }} /> }}
                  />
                  <Stack.Screen name="MyLikedPost" component={MyLikedPostScreen} options={{ headerShown: false }} />
                  <Stack.Screen
                    name="MyTeam"
                    component={MyTeamScreen}
                    options={{ header: () => <DefaultHeader title="내 모임" customStyle={{ backgroundColor: '#FBFBFD' }} /> }}
                  />
                  <Stack.Screen name="Team" options={{ headerShown: false }}>
                    {props => <TeamScreen {...props} paramName="Team" />}
                  </Stack.Screen>
                  <Stack.Screen name="TeamCalendar" options={{ headerShown: false }}>
                    {props => <TeamCalendarScreen {...props} paramName="TeamCalendar" />}
                  </Stack.Screen>
                  <Stack.Screen name="TeamSetting" options={{ headerShown: false }}>
                    {props => <TeamSettingScreen {...props} paramName="TeamSetting" />}
                  </Stack.Screen>
                  <Stack.Screen name="TeamEdit" options={{ headerShown: false }}>
                    {props => <TeamEditScreen {...props} paramName="TeamEdit" />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false, contentStyle: { backgroundColor: '#FBFBFD' } }}
                  />
                  <Stack.Screen name="Notify" component={NotifyScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
              </SAVProvider>
            </SheetProvider>
          </NavigationContainer>
        </ToastNotiProvider>
      </RQProvider>
    </GestureHandlerRootView>
  );
}

export default App;
