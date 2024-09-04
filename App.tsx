import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KAKAO_NATIVE_APP_KEY } from '@env';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@components/BottomSheet/sheets';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

import RQProvider from '@components/provider/RQProvider';
import ToastNotiProvider from '@components/provider/ToastProvider';
import SAVProvider from '@components/provider/SAVProvider';

import DefaultHeader from '@components/common/DefaultHeader';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignupNicknameScreen from './src/screens/SignupNicknameScreen';
import SignupPhotoScreen from './src/screens/SignupPhotoScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileMyInfoScreen from './src/screens/ProfileMyInfoScreen';
import ProfileMyFriendScreen from './src/screens/ProfileMyFriendScreen';
import ProfileMyGroupScreen from './src/screens/ProfileMyGroupScreen';
import NotifyScreen from './src/screens/NotifyScreen';
import TeamScreen from './src/screens/TeamScreen';
import TeamCalendarScreen from './src/screens/TeamCalendarScreen';
import TeamSettingScreen from './src/screens/TeamSettingScreen';
import TeamEditScreen from './src/screens/TeamEditScreen';

function App() {
  const Stack = createNativeStackNavigator();
  const SignupStack = createNativeStackNavigator();
  function SignupStackNavi() {
    return (
      <SignupStack.Navigator screenOptions={{ header: () => <DefaultHeader title="회원가입" />, contentStyle: { backgroundColor: '#fff' } }}>
        <SignupStack.Screen name="Nickname" component={SignupNicknameScreen} />
        <SignupStack.Screen name="Photo" component={SignupPhotoScreen} />
      </SignupStack.Navigator>
    );
  }
  const ProfileStack = createNativeStackNavigator();
  function ProfileStackNavi() {
    return (
      <ProfileStack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#F8F8FB' } }}>
        <ProfileStack.Screen
          name="MyInfo"
          component={ProfileMyInfoScreen}
          options={{ headerShown: false, contentStyle: { backgroundColor: '#fff' } }}
        />
        <ProfileStack.Screen name="MyFriend" component={ProfileMyFriendScreen} options={{ header: () => <DefaultHeader title="내 친구" /> }} />
        <ProfileStack.Screen name="MyGroup" component={ProfileMyGroupScreen} options={{ header: () => <DefaultHeader title="내 모임" /> }} />
      </ProfileStack.Navigator>
    );
  }

  initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RQProvider>
        <ToastNotiProvider>
          <NavigationContainer>
            <SheetProvider>
              <SAVProvider>
                <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
                  <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Signup" component={SignupStackNavi} options={{ headerShown: false }} />
                  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Profile" component={ProfileStackNavi} options={{ headerShown: false }} />
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
