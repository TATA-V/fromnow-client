import React from 'react';
import { login } from '@react-native-kakao/user';
import KakaoIcon from '@assets/icons/kakao.svg';
import Button from '@components/common/Button';
import useToast from '@hooks/useToast';
import { useSignInSocial } from '@hooks/query';

const KakaoSignInBtn = () => {
  const { showToast } = useToast();
  const signInMutation = useSignInSocial();

  const signInWithKakao = async () => {
    try {
      const res = await login();
      const accessToken = res.accessToken;
      signInMutation.mutate({ path: 'kakao', token: accessToken });
      console.log('accessToken:', accessToken);
    } catch (error) {
      showToast('Kakao login failed:', error);
    }
  };

  return (
    <Button onPress={signInWithKakao} color="yellow" Icon={KakaoIcon}>
      Kakao로 로그인하기
    </Button>
  );
};

export default KakaoSignInBtn;
