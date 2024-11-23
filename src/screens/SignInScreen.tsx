import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Logo from '@assets/icons/logo.svg';
import usePolicyStore from '@store/usePolicyStore';
import useClearAllUserData from '@hooks/useClearAllUserData';

import GoogleSignInBtn from '@components/SignIn/GoogleSignInBtn';
import KakaoSignInBtn from '@components/SignIn/KakaoSignInBtn';

const SignInScreen = () => {
  const { animated } = usePolicyStore(state => state);
  const clearAllUserData = useClearAllUserData();

  useEffect(() => {
    clearAllUserData();
  }, []);

  return (
    <>
      <View className="h-screen flex flex-col justify-between">
        <View className="w-full flex items-center pt-[120px]">
          <View className="w-[200px] h-[38px] mb-4">
            <Logo />
          </View>
          <Text className="font-UhBee text-[28px]">지금의 순간을 기록하세요, 프롬 나우</Text>
        </View>
      </View>
      {animated && (
        <View className="absolute bottom-[20px] px-4 w-full">
          <GoogleSignInBtn />
          <View className="mt-[12px]">
            <KakaoSignInBtn />
          </View>
        </View>
      )}
    </>
  );
};

export default SignInScreen;
