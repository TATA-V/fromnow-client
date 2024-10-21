import { getAllMyFriend, getAllMyFriendRequest, getAllMyLikedBoard, getAllMyTeamRequest, getOne, updateNickname, updatePhoto } from '@api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { MyTeamRequest, MyProfile } from '@clientTypes/user';
import { Friend } from '@clientTypes/friend';
import { Dispatch, SetStateAction } from 'react';
import { QUERY_KEY, useKey } from '@hooks/query';
import useUserStore from '@store/useUserStore';
import { Board } from '@clientTypes/board';

export const useGetMyProfile = () => {
  const queryKey = useKey([QUERY_KEY.MY, 'profile']);
  const { navigation } = useNavi();

  const { data, isError, isLoading } = useQuery<MyProfile>({
    queryKey,
    queryFn: getOne,
  });
  if (isError) {
    navigation.navigate('SignIn');
  }

  return { data, isError, isLoading };
};

export const useUpdateNickname = (setNickname?: Dispatch<SetStateAction<string>>) => {
  const setName = useUserStore(state => state.setName);
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const myProfileKey = useKey([QUERY_KEY.MY, 'profile']);

  const updateNicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: res => {
      queryClient.setQueryData(myProfileKey, (prev: MyProfile) => ({ ...prev, profileName: res.data.profileName }));
      setNickname && setNickname(res.data.profileName);
      setName(res.data.profileName);
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
        navigation.navigate('Home', { refresh: true });
        successToast('🎉 프롬나우에서 멋진 시간을 보내세요!');
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
    staleTime: 0,
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
