import { getSearchFriend, postFriendAccept, postFriendRequest } from '@api/friend';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SearchFriend } from '@clientTypes/friend';
import useToast from '@hooks/useToast';

export const useGetSearchFriend = () => {
  const { data, isError, isLoading } = useQuery<SearchFriend[]>({
    queryKey: ['search', 'friend'],
    queryFn: getSearchFriend,
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
