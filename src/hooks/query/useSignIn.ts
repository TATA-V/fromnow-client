import { getOne } from '@api/user';
import { setStorage } from '@utils/storage';
import { useMutation } from '@tanstack/react-query';
import useNavi from '@hooks/useNavi';
import { isWeb } from '@utils/deviceInfo';
import useToast from '@hooks/useToast';

export const useSignInGoogle = () => {
  const { navigate, navigation } = useNavi();
  const { showToast } = useToast();

  const signInMutation = useMutation({
    mutationFn: getOne,
    onSuccess: res => {
      const access = res.headers.authorization;
      setStorage('access', access);
      if (isWeb) {
        navigate('/');
        return;
      }
      navigation.navigate('Home');
    },
    onError: error => {
      showToast(`로그인에 실패했습니다: ${error}`);
    },
  });

  return signInMutation;
};
