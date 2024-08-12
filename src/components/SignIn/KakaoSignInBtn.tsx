import React from 'react';
import { CLIENT_URL } from '@env';
import { isWeb } from '@utils/deviceInfo';
import { login } from '@react-native-kakao/user';
import KakaoIcon from '@assets/icons/kakao.svg';
import Button from '@components/common/Button';

const KakaoSignInBtn = () => {
  const signInWithKakao = async () => {
    if (isWeb) {
      try {
        await login({ web: { redirectUri: CLIENT_URL, prompt: ['select_account'] } });
        return;
      } catch (error) {
        console.error('Kakao login failed:', error);
      }
    }

    try {
      const res = await login();
      const idToken = res.idToken;
    } catch (error) {
      console.error('Kakao login failed:', error);
    }
  };

  return (
    <Button onPress={signInWithKakao} color="yellow" Icon={KakaoIcon}>
      Kakao로 로그인하기
    </Button>
  );
};

export default KakaoSignInBtn;
