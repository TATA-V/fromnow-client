import React from 'react';
import { Text, View } from 'react-native';
import Logo from '@assets/icons/logo.svg';

import GoogleSignInBtn from '@components/SignIn/GoogleSignInBtn';
import KakaoSignInBtn from '@components/SignIn/KakaoSignInBtn';

const SignInScreen = () => {
  return (
    <>
      <View className="h-screen flex flex-col justify-between">
        <View className="w-full flex items-center pt-[120px]">
          <View className="w-[200px] h-[38px] mb-4">
            <Logo />
          </View>
          <Text className="font-UhBee text-[28px]">지금의 순간을 기록하세요, 프롬 나우</Text>
        </View>
        <View className="flex flex-col mb-[60px] px-5">
          <GoogleSignInBtn />
          <View className="mt-[12px]">
            <KakaoSignInBtn />
          </View>
        </View>
      </View>
    </>
  );
};

export default SignInScreen;
