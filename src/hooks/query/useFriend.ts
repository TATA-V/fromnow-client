import { deleteFriend, getSearchFriend, postFriendAccept, postFriendRequest } from '@api/friend';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';
import { Friend } from '@clientTypes/user';

export const useGetSearchFriend = (profileName: string, options = {}) => {
  const queryKey = useKey(['search', QUERY_KEY.FRIEND, profileName]);
  const { data, isError, isLoading } = useQuery<Friend[]>({
    queryKey,
    queryFn: () => getSearchFriend(profileName),
    staleTime: 0,
    gcTime: 0,
    ...options,
  });

  return { data, isError, isLoading };
};

export const usePostFriendRequest = () => {
  const { successToast, errorToast } = useToast();

  const friendRequestMutation = useMutation({
    mutationFn: postFriendRequest,
    onSuccess: () => {
      successToast('친구 요청 완료!');
    },
    onError: () => {
      errorToast('친구 요청에 실패했습니다.');
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
      queryClient.setQueryData(myFriendsKey, (prev: Friend[]) => [{ ...res.data, friend: true }, ...prev]);
      successToast('친구 수락 완료!');
    },
    onError: () => {
      errorToast('친구 수락에 실패했습니다.');
    },
  });

  return { friendAcceptMutation };
};

export const useDeleteFriend = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myFriendsKey = useKey([QUERY_KEY.MY, 'friends']);

  const friendDeleteMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myFriendsKey });
      successToast('친구가 삭제되었습니다.');
    },
    onError: () => {
      errorToast('친구 삭제에 실패했습니다.');
    },
  });

  return { friendDeleteMutation };
};
