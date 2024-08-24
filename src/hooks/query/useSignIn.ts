import { GetOne, getOne } from '@api/user';
import { setStorage } from '@utils/storage';
import { useMutation } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';
import useToast from '@hooks/useToast';

export const useSignInSocial = () => {
  const { showToast } = useToast();

  const signInMutation = useMutation({
    mutationFn: ({ path, token }: GetOne) => getOne({ path, token }),
    onSuccess: res => {
      const access = res.headers.authorization;
      setStorage('access', access);
      SheetManager.show('signup-policy');
    },
    onError: error => {
      console.log('error:', error);
      showToast(`로그인에 실패했습니다: ${error}`);
    },
  });

  return signInMutation;
};
