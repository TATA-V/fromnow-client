import {
  deleteOne,
  getAllMyFriend,
  getAllMyFriendRequest,
  getAllMyLikedBoard,
  getAllMyTeamRequest,
  getOne,
  logout,
  updateNickname,
  updatePhoto,
} from '@api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { MyTeamRequest, MyProfile } from '@clientTypes/user';
import { Friend } from '@clientTypes/friend';
import { QUERY_KEY, useKey } from '@hooks/query';
import useUserStore from '@store/useUserStore';
import { Board } from '@clientTypes/board';
import { setStorage } from '@utils/storage';
import useClearAllUserData from '@hooks/useClearAllUserData';
import { useTranslation } from 'react-i18next';

export const useGetMyProfile = () => {
  const queryKey = useKey([QUERY_KEY.MY, 'profile']);

  const { data, isError, isLoading } = useQuery<MyProfile>({
    queryKey,
    queryFn: getOne,
  });

  return { data, isError, isLoading };
};

export const useUpdateNickname = () => {
  const setName = useUserStore(state => state.setName);
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const myProfileKey = useKey([QUERY_KEY.MY, 'profile']);
  const { t } = useTranslation();

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: async res => {
      const name = res.data.profileName;
      await queryClient.setQueryData(myProfileKey, (prev: MyProfile) => {
        return { ...prev, profileName: name };
      });
      setName(name);
      await setStorage('name', name);
      if (route.name === 'SignupNickname') {
        successToast(`${t('toast.name.setSuccess')}`);
        navigation.navigate('SignupPhoto');
        return;
      }
      successToast(`${t('toast.name.changeSuccess')}`);
    },
    onError: error => {
      if (error.message === 'Request failed with status code 409') {
        errorToast(`${t('toast.name.exists')}`);
        return;
      }
      errorToast(`${t('toast.name.changeFail')}`);
    },
  });

  return {
    updateNicknameMutation,
  };
};

export const useUpdatePhoto = () => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);
  const myProfileKey = useKey([QUERY_KEY.MY, 'profile']);
  const { t } = useTranslation();

  const updatePhotoMutation = useMutation({
    mutationFn: updatePhoto,
    onSuccess: async res => {
      if (route.name === 'SignupPhoto') {
        successToast(`${t('toast.signup.welcome')}`);
        navigation.navigate('Bottom', { screen: 'Home', refresh: true });
        return;
      }
      await queryClient.setQueryData(myProfileKey, (prev: MyProfile) => {
        return { ...prev, photoUrl: res.data.photoUrl };
      });
      await queryClient.invalidateQueries({ queryKey: myTeamsKey });
      successToast(`${t('toast.image.changeSuccess')}`);
    },
    onError: () => {
      errorToast(`${t('toast.image.changeFail')}`);
    },
  });

  return {
    updatePhotoMutation,
  };
};

export const useGetAllMyLikedBoard = () => {
  const queryKey = useKey([QUERY_KEY.MY, 'liked', 'posts']);
  const { data, isError, isLoading } = useQuery<Board[]>({
    queryKey,
    queryFn: getAllMyLikedBoard,
  });

  return { data, isError, isLoading };
};

export const useGetAllMyFriend = ({ options }: { options?: Object } = {}) => {
  const queryKey = useKey([QUERY_KEY.MY, 'friends']);
  const { data, isError, isLoading, refetch } = useQuery<Friend[]>({
    queryKey,
    queryFn: getAllMyFriend,
    ...(options || {}),
  });

  return { data, isError, isLoading, refetch };
};

export const useGetAllMyFriendRequest = ({ options }: { options?: Object } = {}) => {
  const queryKey = useKey([QUERY_KEY.MY, 'friend', 'request']);
  const { data, isError, isLoading, refetch } = useQuery<Friend[]>({
    queryKey,
    queryFn: getAllMyFriendRequest,
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    ...(options || {}),
  });

  return { data, isError, isLoading, refetch };
};

export const useGetAllMyTeamRequest = () => {
  const queryKey = useKey([QUERY_KEY.MY, 'team', 'request']);
  const { data, isError, isLoading } = useQuery<MyTeamRequest[]>({
    queryKey,
    queryFn: getAllMyTeamRequest,
  });

  return { data, isError, isLoading };
};

export const useDeleteUser = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const clearAllUserData = useClearAllUserData();
  const { t } = useTranslation();

  const deleteUserMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: async res => {
      await clearAllUserData();
      navigation.navigate('SignIn');
      successToast(`${res.profileName} ${t('toast.deleteUser.success')}`);
    },
    onError: () => {
      errorToast(`${t('toast.deleteUser.fail')}`);
    },
  });

  return { deleteUserMutation };
};

export const useLogoutUser = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const clearAllUserData = useClearAllUserData();
  const { t } = useTranslation();

  const logoutUserMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await clearAllUserData();
      navigation.navigate('SignIn');
      successToast(`${t('toast.logout.success')}`);
    },
    onError: () => {
      errorToast(`${t('toast.logout.fail')}`);
    },
  });

  return { logoutUserMutation };
};
