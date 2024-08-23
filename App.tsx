import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KAKAO_NATIVE_APP_KEY } from '@env';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@components/BottomSheet/sheets';

import RQProvider from '@components/provider/RQProvider';
import ToastNotiProvider from '@components/provider/ToastProvider';
import SAVProvider from '@components/provider/SAVProvider';

import SignupHeader from '@components/Signup/SignupHeader';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignupNicknameScreen from './src/screens/SignupNicknameScreen';
import SignupPhotoScreen from './src/screens/SignupPhotoScreen';
import SearchScreen from './src/screens/SearchScreen';

function App() {
  const Stack = createNativeStackNavigator();
  const SignupStack = createNativeStackNavigator();
  function SignupStackNavi() {
    return (
      <SignupStack.Navigator screenOptions={{ header: () => <SignupHeader />, contentStyle: { backgroundColor: '#fff' } }}>
        <SignupStack.Screen name="Nickname" component={SignupNicknameScreen} options={{ header: () => <SignupHeader /> }} />
        <SignupStack.Screen name="Photo" component={SignupPhotoScreen} options={{ header: () => <SignupHeader /> }} />
      </SignupStack.Navigator>
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
                  <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="Signup" component={SignupStackNavi} />
                  <Stack.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{ headerShown: false, contentStyle: { backgroundColor: '#FBFBFD' } }}
                  />
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
