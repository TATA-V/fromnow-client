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
import { BaseAxiosError } from '@clientTypes/base';
import { useTranslation } from 'react-i18next';

export const useGetSearchFriend = (profileName: string, options = {}) => {
  const queryKey = useKey(['search', QUERY_KEY.FRIEND, profileName]);
  const { data, isError, isLoading } = useQuery<Friend[]>({
    queryKey,
    queryFn: async () => await getSearchFriend(profileName),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    ...options,
  });

  return { data, isError, isLoading };
};

export const useGetSearchTeamFriend = ({ diaryId, profileName, options }: GetSearchTeamFriend & { options?: Object }) => {
  const queryKey = useKey(['search', QUERY_KEY.FRIEND, QUERY_KEY.TEAM, profileName]);
  const { data, isError, isLoading, refetch } = useQuery<TeamFriend[]>({
    queryKey,
    queryFn: async () => await getSearchTeamFriend({ diaryId, profileName }),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    ...(options || {}),
  });

  return { data, isError, isLoading, refetch };
};

export const usePostFriendRequest = (toastModal?: boolean) => {
  const { successToast, errorToast, warnToast } = useToast();
  const { showToastModal } = useToastModal();
  const { t } = useTranslation();

  const friendRequestMutation = useMutation({
    mutationFn: postFriendRequest,
    onSuccess: () => {
      toastModal ? showToastModal({ type: 'success', message: `${t('toast.friendReq.success')}` }) : successToast(`${t('toast.friendReq.success')}`);
    },
    onError: e => {
      const error = e as BaseAxiosError;
      const { code, message } = error.response.data;
      if (code === 409 && message === '이미 서로 친구입니다') {
        toastModal ? showToastModal({ type: 'warn', message: `${t('toast.warn.success')}` }) : warnToast(`${t('toast.warn.success')}`);
        return;
      }
      toastModal ? showToastModal({ type: 'error', message: `${t('toast.friendReq.fail')}` }) : errorToast(`${t('toast.friendReq.fail')}`);
    },
  });

  return { friendRequestMutation };
};

export const usePostFriendReject = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myFriendReqKey = useKey([QUERY_KEY.MY, 'friend', 'request']);
  const { t } = useTranslation();

  const friendRequestMutation = useMutation({
    mutationFn: postFriendReject,
    onSuccess: () => {
      successToast(`${t('toast.friendReqDelete.success')}`);
      queryClient.invalidateQueries({ queryKey: myFriendReqKey });
    },
    onError: () => {
      errorToast(`${t('toast.friendReqDelete.fail')}`);
    },
  });

  return { friendRequestMutation };
};

export const usePostFriendAccept = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myFriendReqKey = useKey([QUERY_KEY.MY, 'friend', 'request']);
  const myFriendsKey = useKey([QUERY_KEY.MY, 'friends']);
  const { t } = useTranslation();

  const friendAcceptMutation = useMutation({
    mutationFn: postFriendAccept,
    onSuccess: async res => {
      await queryClient.invalidateQueries({ queryKey: myFriendReqKey });
      await queryClient.setQueryData(myFriendsKey, (prev: Friend[]) => [{ ...res.data, friend: true, profilePhotoUrl: res.data.photoUrl }, ...prev]);
      successToast(`${t('toast.friendAccept.success')}`);
    },
    onError: () => {
      errorToast(`${t('toast.friendAccept.fail')}`);
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
  const { t } = useTranslation();

  const friendDeleteMutation = useMutation({
    mutationFn: deleteFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myFriendsKey });
      diaryId && queryClient.invalidateQueries({ queryKey: teamMenuKey });
      toastModal
        ? showToastModal({ type: 'success', message: `${t('toast.friendDelete.success')}` })
        : successToast(`${t('toast.friendDelete.success')}`);
    },
    onError: () => {
      toastModal ? showToastModal({ type: 'error', message: `${t('toast.friendDelete.fail')}` }) : errorToast(`${t('toast.friendDelete.fail')}`);
    },
  });

  return { friendDeleteMutation };
};
