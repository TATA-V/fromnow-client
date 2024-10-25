import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KAKAO_NATIVE_APP_KEY } from '@env';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AnimatePresence, MotiView } from 'moti';
import { StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import '@components/BottomSheet/sheets';
import { navigationRef } from '@utils/rootNavigation';
import { linking } from './deeplinkConfig';

import RQProvider from '@components/provider/RQProvider';
import ToastNotiProvider from '@components/provider/ToastProvider';
import SAVProvider from '@components/provider/SAVProvider';

import BottomTabBar from '@components/BottomNavi/BottomTabBar';
import SplashLottie from '@components/Lottie/SplashLottie';
import DefaultHeader from '@components/common/DefaultHeader';
import ProfileHeader from '@components/Profile/ProfileHeader';
import PolicyHeader from '@components/Policy/PolicyHeader';
import TeamHeader from '@components/Team/TeamHeader';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignupNicknameScreen from './src/screens/SignupNicknameScreen';
import SignupPhotoScreen from './src/screens/SignupPhotoScreen';
import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyFriendScreen from './src/screens/MyFriendScreen';
import MyTeamRequestScreen from './src/screens/MyTeamRequestScreen';
import NoticeScreen from './src/screens/NoticeScreen';
import TeamScreen from './src/screens/TeamScreen';
import TeamCalendarScreen from './src/screens/TeamCalendarScreen';
import TeamEditScreen from './src/screens/TeamEditScreen';
import MyLikedBoardScreen from './src/screens/MyLikedBoardScreen';
import TeamDetailScreen from './src/screens/TeamDetailScreen';
import TeamFriendAddScreen from './src/screens/TeamFriendAddScreen';
import CameraScreen from './src/screens/CameraScreen';
import BoardEditScreen from './src/screens/BoardEditScreen';
import TeamCreateScreen from './src/screens/TeamCreateScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import ServicePolicyScreen from './src/screens/ServicePolicyScreen';

function App() {
  const [showLottie, setShowLottie] = useState(true);
  const [isDarkModeStatusBar, setIsDarkModeStatusBar] = useState(true);

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      BootSplash.hide({ fade: false });
      setShowLottie(false);
    }, 2000);
    const unsubscribeDarkMode = setTimeout(() => {
      setIsDarkModeStatusBar(false);
    }, 2500);

    return () => {
      clearTimeout(unsubscribe);
      clearTimeout(unsubscribeDarkMode);
    };
  }, []);

  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={() => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          tabBarShown: false,
          contentStyle: { backgroundColor: '#fff' },
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
          <NavigationContainer ref={navigationRef} linking={linking}>
            <SheetProvider>
              <SAVProvider isDarkMode={isDarkModeStatusBar}>
                <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
                  <Stack.Screen name="Bottom" component={BottomTabScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
                  <Stack.Screen
                    name="SignupNickname"
                    component={SignupNicknameScreen}
                    options={{ header: () => <DefaultHeader isSignup={true} title="회원가입" />, contentStyle: { backgroundColor: '#fff' } }}
                  />
                  <Stack.Screen
                    name="SignupPhoto"
                    component={SignupPhotoScreen}
                    options={{ header: () => <DefaultHeader title="회원가입" />, contentStyle: { backgroundColor: '#fff' } }}
                  />
                  <Stack.Screen
                    name="MyFriend"
                    options={{
                      header: () => <DefaultHeader path="Bottom?screen=Profile" title="내 친구" customStyle={{ backgroundColor: '#FBFBFD' }} />,
                    }}>
                    {props => <MyFriendScreen {...props} paramName="MyFriend" />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="MyTeamRequest"
                    component={MyTeamRequestScreen}
                    options={{
                      header: () => (
                        <DefaultHeader path="Bottom?screen=Profile" title="받은 모임 요청" customStyle={{ backgroundColor: '#FBFBFD' }} />
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="MyLikedBoard"
                    component={MyLikedBoardScreen}
                    options={{ header: () => <DefaultHeader title="좋아요 누른 일상" customStyle={{ backgroundColor: '#FBFBFD' }} /> }}
                  />
                  <Stack.Screen name="Team" options={{ header: () => <TeamHeader /> }}>
                    {props => <TeamScreen {...props} paramName="Team" />}
                  </Stack.Screen>
                  <Stack.Screen name="TeamCalendar" component={TeamCalendarScreen} options={{ header: () => <TeamHeader /> }} />
                  <Stack.Screen name="TeamEdit" options={{ header: () => <DefaultHeader title="모임정보 수정하기" /> }}>
                    {props => <TeamEditScreen {...props} paramName="TeamEdit" />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="TeamFriendAdd"
                    options={{
                      contentStyle: { backgroundColor: '#FBFBFD' },
                      header: () => <DefaultHeader title="모임친구 초대" customStyle={{ backgroundColor: '#FBFBFD' }} />,
                    }}>
                    {props => <TeamFriendAddScreen {...props} paramName="TeamFriendAdd" />}
                  </Stack.Screen>
                  <Stack.Screen name="TeamDetail" options={{ headerShown: false }}>
                    {props => <TeamDetailScreen {...props} paramName="TeamDetail" />}
                  </Stack.Screen>
                  <Stack.Screen name="TeamCreate" component={TeamCreateScreen} options={{ header: () => <DefaultHeader title="모임 생성하기" /> }} />
                  <Stack.Screen name="BoardEdit" options={{ header: () => <DefaultHeader title="일상 기록하기" /> }}>
                    {props => <BoardEditScreen {...props} paramName="BoardEdit" />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false, contentStyle: { backgroundColor: '#FBFBFD' } }}
                  />
                  <Stack.Screen name="Notice" component={NoticeScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="PrivacyPolicy" options={{ header: () => <PolicyHeader title="개인정보처리방침" /> }}>
                    {props => <PrivacyPolicyScreen {...props} paramName="PrivacyPolicy" />}
                  </Stack.Screen>
                  <Stack.Screen name="ServicePolicy" options={{ header: () => <PolicyHeader title="서비스 이용약관" /> }}>
                    {props => <ServicePolicyScreen {...props} paramName="ServicePolicy" />}
                  </Stack.Screen>
                </Stack.Navigator>
                <AnimatePresence>
                  {showLottie && (
                    <MotiView
                      style={[StyleSheet.absoluteFill]}
                      className="bg-black900 flex justify-center items-center"
                      from={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <SplashLottie customStyle={{ height: 500, width: '100%' }} />
                    </MotiView>
                  )}
                </AnimatePresence>
              </SAVProvider>
            </SheetProvider>
          </NavigationContainer>
        </ToastNotiProvider>
      </RQProvider>
    </GestureHandlerRootView>
  );
}

export default App;
