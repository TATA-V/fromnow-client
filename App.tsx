import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { isWeb } from '@utils/deviceInfo';
import { KAKAO_NATIVE_APP_KEY, KAKAO_NATIVE_JS_KEY, KAKAO_NATIVE_API_KEY } from '@env';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { SheetProvider } from 'react-native-actions-sheet';
import '@components/BottomSheet/sheets';

import RQProvider from '@components/provider/RQProvider';
import ToastNotiProvider from '@components/provider/ToastProvider';
import HomeScreen from 'screens/HomeScreen';
import SignInScreen from 'screens/SignInScreen';

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
        <RQProvider>
          <ToastNotiProvider>
            <SheetProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                  <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignInScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            </SheetProvider>
          </ToastNotiProvider>
        </RQProvider>
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
