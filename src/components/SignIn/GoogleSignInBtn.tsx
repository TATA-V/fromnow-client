import React from 'react';
import { isIOS } from '@utils/deviceInfo';
import { GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin';
import { ANDROID_WEB_CLIENT_ID, IOS_WED_CLIENT_ID, IOS_CLIENT_ID } from '@env';
import { useSignInSocial } from '@hooks/query';
import useToast from '@hooks/useToast';
import GoogleIcon from '@assets/icons/google.svg';
import Button from '@components/common/Button';
import { useDebounce } from '@hooks/useOptimization';
import { useTranslation } from 'react-i18next';

const GoogleSignInBtn = () => {
  const { errorToast } = useToast();
  const { t } = useTranslation();

  GoogleSignin.configure({
    webClientId: isIOS ? IOS_WED_CLIENT_ID : ANDROID_WEB_CLIENT_ID,
    iosClientId: isIOS && IOS_CLIENT_ID,
    offlineAccess: true,
  });
  const signInMutation = useSignInSocial();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const res = await GoogleSignin.signIn();
      const idToken = res.data.idToken;
      signInMutation.mutate({ path: 'google', token: idToken });
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            errorToast('이미 로그인 프로세스가 진행 중입니다.');
            break;
          case statusCodes.SIGN_IN_CANCELLED:
            errorToast('로그인이 취소되었습니다.');
            break;
          case statusCodes.SIGN_IN_REQUIRED:
            errorToast('로그인이 필요합니다. 다시 시도하세요.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            errorToast('플레이 서비스가 없거나 오래되었습니다.');
            break;
          default:
            errorToast(`알 수 없는 오류가 발생했습니다: ${error}`);
        }
      } else {
        errorToast(`구글 로그인과 관련 없는 오류가 발생했습니다: ${error}`);
      }
    }
  };

  const debounceSignInWithGoogle = useDebounce(signInWithGoogle, 500);

  return (
    <Button onPress={debounceSignInWithGoogle} color="white" icon={<GoogleIcon />}>
      {t('signin.googleSignin')}
    </Button>
  );
};

export default GoogleSignInBtn;
