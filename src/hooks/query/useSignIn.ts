import { GetOne, getOne } from '@api/auth';
import { setStorage } from '@utils/storage';
import { useMutation } from '@tanstack/react-query';
import { SheetManager } from 'react-native-actions-sheet';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import useUserStore from '@store/useUserStore';
import useGetFCMToken from '@hooks/useGetFCMToken';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export const useSignInSocial = () => {
  const setName = useUserStore(state => state.setName);
  const { errorToast } = useToast();
  const { navigation } = useNavi();
  const { getFCMToken } = useGetFCMToken();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const signInMutation = useMutation({
    mutationFn: async ({ path, token }: GetOne) => await getOne({ path, token }),
    onSuccess: async res => {
      const access = res.headers.authorization;
      const profileName = res.data.data.profileName;
      await setStorage('access', access);
      await setStorage('name', profileName);
      profileName && setName(profileName);
      await getFCMToken();
      await queryClient.invalidateQueries();
      if (res.data.message === '새로 회원가입하는 유저입니다!' || res.data.data.requiresAdditionalInfo) {
        SheetManager.show('signup-policy');
        return;
      }
      navigation.navigate('Bottom', { screen: 'Home', refresh: true });
    },
    onError: async error => {
      errorToast(`${t('signin.loginFailed')}: ${error}`);
    },
  });

  return signInMutation;
};
