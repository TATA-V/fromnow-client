import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isWeb } from '@utils/deviceInfo';
import { KAKAO_NATIVE_APP_KEY, KAKAO_NATIVE_JS_KEY, KAKAO_NATIVE_API_KEY } from '@env';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '@components/BottomSheet/sheets';

import RQProvider from '@components/provider/RQProvider';
import ToastNotiProvider from '@components/provider/ToastProvider';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignupNicknameScreen from './src/screens/SignupNicknameScreen';
import SignupPhotoScreen from './src/screens/SignupPhotoScreen';

function App() {
  const Stack = createNativeStackNavigator();
  if (!isWeb) {
    initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
  }
  if (isWeb) {
    initializeKakaoSDK(KAKAO_NATIVE_APP_KEY, { web: { javascriptKey: KAKAO_NATIVE_JS_KEY, restApiKey: KAKAO_NATIVE_API_KEY } });
  }

  return (
    <>
      {!isWeb && (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RQProvider>
            <ToastNotiProvider>
              <NavigationContainer>
                <SheetProvider>
                  <Stack.Navigator>
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={SignupPhotoScreen} />
                    <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignInScreen} />
                    <Stack.Screen name="SignupNickname" options={{ headerShown: false }} component={SignupNicknameScreen} />
                    <Stack.Screen name="SignupPhoto" options={{ headerShown: false }} component={SignupPhotoScreen} />
                  </Stack.Navigator>
                </SheetProvider>
              </NavigationContainer>
            </ToastNotiProvider>
          </RQProvider>
        </GestureHandlerRootView>
      )}
      {isWeb && (
        <Router>
          <RQProvider>
            <ToastNotiProvider>
              <SheetProvider>
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/signin" element={<SignInScreen />} />
                </Routes>
              </SheetProvider>
            </ToastNotiProvider>
          </RQProvider>
        </Router>
      )}
    </>
  );
}

export default App;
