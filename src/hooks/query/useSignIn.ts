import { GetOne, getOne } from '@api/auth';
import { setStorage } from '@utils/storage';
import { useMutation } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import useUserStore from '@store/useUserStore';
import useGetFCMToken from '@hooks/useGetFCMToken';

export const useSignInSocial = () => {
  const setName = useUserStore(state => state.setName);
  const { errorToast } = useToast();
  const { navigation } = useNavi();
  const { getFCMToken } = useGetFCMToken();

  const signInMutation = useMutation({
    mutationFn: ({ path, token }: GetOne) => getOne({ path, token }),
    onSuccess: async res => {
      const access = res.headers.authorization;
      const profileName = res.data.data.profileName;
      await setStorage('access', access);
      await setStorage('name', profileName);
      profileName && setName(profileName);
      const fcm = await getFCMToken();
      console.log('fcm:', fcm);
      if (res.data.message === '새로 회원가입하는 유저입니다!') {
        SheetManager.show('signup-policy');
        return;
      }
      navigation.navigate('Bottom', { screen: 'Home', refresh: true });
    },
    onError: error => {
      errorToast(`로그인에 실패했습니다: ${error}`);
    },
  });

  return signInMutation;
};
