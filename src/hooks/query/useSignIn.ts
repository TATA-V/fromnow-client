import { GetOne, getOne } from '@api/auth';
import { setStorage } from '@utils/storage';
import { useMutation } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';

export const useSignInSocial = () => {
  const { errorToast } = useToast();
  const { navigation } = useNavi();

  const signInMutation = useMutation({
    mutationFn: ({ path, token }: GetOne) => getOne({ path, token }),
    onSuccess: async res => {
      const access = res.headers.authorization;
      await setStorage('access', access);
      if (res.data.message === '새로 회원가입하는 유저입니다!') {
        SheetManager.show('signup-policy');
        return;
      }
      navigation.navigate('Home', { refresh: true });
    },
    onError: error => {
      console.log('signin error:', error);
      errorToast(`로그인에 실패했습니다: ${error}`);
    },
  });

  return signInMutation;
};
