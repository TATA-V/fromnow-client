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

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: async res => {
      const name = res.data.profileName;
      await queryClient.setQueryData(myProfileKey, (prev: MyProfile) => {
        console.log('updateNickname:', { ...prev, profileName: name });
        return { ...prev, profileName: name };
      });
      setName(name);
      await setStorage('name', name);
      if (route.name === 'SignupNickname') {
        successToast('별명 설정 완료!');
        navigation.navigate('SignupPhoto');
        return;
      }
      successToast('닉네임 변경 완료!');
    },
    onError: error => {
      if (error.message === 'Request failed with status code 409') {
        errorToast('이미 존재하는 별명입니다.');
        return;
      }
      errorToast('별명 변경에 실패했습니다.');
      errorToast('error.message');
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

  const updatePhotoMutation = useMutation({
    mutationFn: updatePhoto,
    onSuccess: res => {
      if (route.name === 'SignupPhoto') {
        successToast('🎉 프롬나우에서 멋진 시간을 보내세요!');
        navigation.navigate('Bottom', { screen: 'Home', refresh: true });
        return;
      }
      queryClient.setQueryData(myProfileKey, (prev: MyProfile) => {
        return { ...prev, photoUrl: res.data.photoUrl };
      });
      queryClient.invalidateQueries({ queryKey: myTeamsKey });
      successToast('이미지 수정 완료!');
    },
    onError: () => {
      errorToast('프로필 사진 변경에 실패했습니다.');
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

export const useGetAllMyFriend = () => {
  const queryKey = useKey([QUERY_KEY.MY, 'friends']);
  const { data, isError, isLoading } = useQuery<Friend[]>({
    queryKey,
    queryFn: getAllMyFriend,
  });

  return { data, isError, isLoading };
};

export const useGetAllMyFriendRequest = () => {
  const queryKey = useKey([QUERY_KEY.MY, 'friend', 'request']);
  const { data, isError, isLoading } = useQuery<Friend[]>({
    queryKey,
    queryFn: getAllMyFriendRequest,
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isError, isLoading };
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

  const deleteUserMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: async res => {
      await clearAllUserData();
      navigation.navigate('SignIn');
      successToast(`${res.profileName} 님 그동안 이용해 주셔서 감사합니다:)`);
    },
    onError: () => {
      errorToast('계정 삭제에 실패했습니다.');
    },
  });

  return { deleteUserMutation };
};

export const useLogoutUser = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const clearAllUserData = useClearAllUserData();

  const logoutUserMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await clearAllUserData();
      navigation.navigate('SignIn');
      successToast('안전하게 로그아웃되었습니다.');
    },
    onError: () => {
      errorToast('로그아웃에 실패했습니다.');
    },
  });

  return { logoutUserMutation };
};
