import React from 'react';
import { login } from '@react-native-kakao/user';
import KakaoIcon from '@assets/icons/kakao.svg';
import Button from '@components/common/Button';
import useToast from '@hooks/useToast';
import { useSignInSocial } from '@hooks/query';
import { useDebounce } from '@hooks/useOptimization';
import { useTranslation } from 'react-i18next';

const KakaoSignInBtn = () => {
  const { errorToast } = useToast();
  const signInMutation = useSignInSocial();
  const { t } = useTranslation();

  const signInWithKakao = async () => {
    try {
      const res = await login();
      const accessToken = res.accessToken;
      signInMutation.mutate({ path: 'kakao', token: accessToken });
    } catch (error) {
      errorToast('Kakao login failed:', error);
    }
  };

  const debounceSignInWithKakao = useDebounce(signInWithKakao, 500);

  return (
    <Button onPress={debounceSignInWithKakao} color="yellow" icon={<KakaoIcon />}>
      {t('signin.kakaoSignin')}
    </Button>
  );
};

export default KakaoSignInBtn;
