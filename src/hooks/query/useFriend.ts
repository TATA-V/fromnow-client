import {
  deleteFriend,
  getSearchFriend,
  getSearchTeamFriend,
  GetSearchTeamFriend,
  postFriendAccept,
  postFriendReject,
  postFriendRequest,
} from '@api/friend';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';
import { Friend, TeamFriend } from '@clientTypes/friend';
import { useToastModal } from '@components/Modal';

export const useGetSearchFriend = (profileName: string, options = {}) => {
  const queryKey = useKey(['search', QUERY_KEY.FRIEND, profileName]);
  const { data, isError, isLoading } = useQuery<Friend[]>({
    queryKey,
    queryFn: () => getSearchFriend(profileName),
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
    ...options,
  });

  return { data, isError, isLoading };
};

export const useGetSearchTeamFriend = ({ diaryId, profileName, options }: GetSearchTeamFriend & { options?: Object }) => {
  const queryKey = useKey(['search', QUERY_KEY.FRIEND, QUERY_KEY.TEAM, profileName]);
  const { data, isError, isLoading } = useQuery<TeamFriend[]>({
    queryKey,
    queryFn: () => getSearchTeamFriend({ diaryId, profileName }),
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
    ...(options || {}),
  });

  return { data, isError, isLoading };
};

export const usePostFriendRequest = (toastModal?: boolean) => {
  const { successToast, errorToast } = useToast();
  const { showToastModal } = useToastModal();

  const friendRequestMutation = useMutation({
    mutationFn: postFriendRequest,
    onSuccess: () => {
      toastModal ? showToastModal({ type: 'success', message: '친구 요청 완료!' }) : successToast('친구 요청 완료!');
    },
    onError: error => {
      console.log(error);
      toastModal ? showToastModal({ type: 'error', message: '친구 요청에 실패했습니다.' }) : errorToast('친구 요청에 실패했습니다.');
    },
  });

  return { friendRequestMutation };
};

export const usePostFriendReject = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myFriendReqKey = useKey([QUERY_KEY.MY, 'friend', 'request']);

  const friendRequestMutation = useMutation({
    mutationFn: postFriendReject,
    onSuccess: () => {
      successToast('친구 요청 삭제 완료');
      queryClient.invalidateQueries({ queryKey: myFriendReqKey });
    },
    onError: () => {
      errorToast('친구 요청 삭제에 실패했습니다.');
    },
  });

  return { friendRequestMutation };
};

export const usePostFriendAccept = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myFriendReqKey = useKey([QUERY_KEY.MY, 'friend', 'request']);
  const myFriendsKey = useKey([QUERY_KEY.MY, 'friends']);

  const friendAcceptMutation = useMutation({
    mutationFn: postFriendAccept,
    onSuccess: res => {
      queryClient.invalidateQueries({ queryKey: myFriendReqKey });
      queryClient.setQueryData(myFriendsKey, (prev: Friend[]) => [{ ...res.data, friend: true, profilePhotoUrl: res.data.photoUrl }, ...prev]);
      successToast('친구 수락 완료!');
    },
    onError: () => {
      errorToast('친구 수락에 실패했습니다.');
    },
  });

  return { friendAcceptMutation };
};

export const useDeleteFriend = (diaryId?: number, toastModal?: boolean) => {
  const { successToast, errorToast } = useToast();
  const { showToastModal } = useToastModal();
  const queryClient = useQueryClient();
  const myFriendsKey = useKey([QUERY_KEY.MY, 'friends']);
  const teamMenuKey = useKey([QUERY_KEY.TEAM, diaryId, 'menu']);

  const friendDeleteMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myFriendsKey });
      diaryId && queryClient.invalidateQueries({ queryKey: teamMenuKey });
      toastModal ? showToastModal({ type: 'success', message: '친구가 삭제되었습니다.' }) : successToast('친구가 삭제되었습니다.');
    },
    onError: () => {
      toastModal ? showToastModal({ type: 'error', message: '친구 삭제에 실패했습니다.' }) : errorToast('친구 삭제에 실패했습니다.');
    },
  });

  return { friendDeleteMutation };
};
