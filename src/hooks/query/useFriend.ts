import { deleteFriend, getSearchFriend, postFriendAccept, postFriendRequest } from '@api/friend';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SearchFriend } from '@clientTypes/friend';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';

export const useGetSearchFriend = (profileName: string, options = {}) => {
  const { data, isError, isLoading } = useQuery<SearchFriend[]>({
    queryKey: useKey(['search', QUERY_KEY.FRIEND, profileName]),
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

  const friendRequestMutation = useMutation({
    mutationFn: postFriendAccept,
    onSuccess: () => {
      successToast('친구 수락 완료!');
    },
    onError: () => {
      errorToast('친구 수락에 실패했습니다.');
    },
  });

  return { friendRequestMutation };
};

export const useDeleteFriend = () => {
  const { successToast, errorToast } = useToast();

  const friendDeleteMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: res => {
      console.log('res.data', res.data);
      successToast('친구가 삭제되었습니다.');
    },
    onError: () => {
      errorToast('친구 삭제에 실패했습니다.');
    },
  });

  return { friendDeleteMutation };
};
