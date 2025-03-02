import { Team, TeamInvite, TeamImmediateInvite, TeamMenu } from '@clientTypes/team';
import {
  deleteOne,
  leaveOne,
  getAll,
  getMenu,
  postAccept,
  postImmediateInvite,
  postInvite,
  postOne,
  postTeamReject,
  UpdateOne,
  updateOne,
} from '@api/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import { QUERY_KEY, useKey } from '@hooks/query';
import { useToastModal } from '@components/Modal';
import { BaseAxiosError } from '@clientTypes/base';
import { useTranslation } from 'react-i18next';

export const useGetAllTeam = () => {
  const queryKey = useKey(['all', QUERY_KEY.TEAM]);
  const { data, isError, error, isLoading } = useQuery<Team[]>({
    queryKey,
    queryFn: getAll,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 7,
  });

  return { data, isError, error: error as BaseAxiosError, isLoading };
};

export const useDeleteOneTeam = (toastModal?: boolean) => {
  const { successToast, errorToast } = useToast();
  const { showToastModal } = useToastModal();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);
  const { t } = useTranslation();

  const deleteTeamMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: myTeamsKey });
      await queryClient.refetchQueries({ queryKey: myTeamsKey });
      navigation.navigate('Home');
      toastModal
        ? showToastModal({ type: 'success', message: `${t('toast.deleteTeam.success')}` })
        : successToast(`${t('toast.deleteTeam.success')}`);
    },
    onError: () => {
      toastModal ? showToastModal({ type: 'error', message: `${t('toast.deleteTeam.fail')}` }) : errorToast(`${t('toast.deleteTeam.fail')}`);
    },
  });

  return { deleteTeamMutation };
};

export const useLeaveOneTeam = (toastModal?: boolean) => {
  const { successToast, errorToast } = useToast();
  const { showToastModal } = useToastModal();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);
  const { t } = useTranslation();

  const leaveTeamMutation = useMutation({
    mutationFn: leaveOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: myTeamsKey });
      await queryClient.refetchQueries({ queryKey: myTeamsKey });
      navigation.navigate('Home');
      toastModal ? showToastModal({ type: 'success', message: `${t('toast.leaveTeam.success')}` }) : successToast(`${t('toast.leaveTeam.success')}`);
    },
    onError: () => {
      toastModal ? showToastModal({ type: 'error', message: `${t('toast.leaveTeam.fail')}` }) : errorToast(`${t('toast.leaveTeam.fail')}`);
    },
  });

  return { leaveTeamMutation };
};

export const useUpdateOneTeam = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);
  const { t } = useTranslation();

  const updateTeamMutation = useMutation({
    mutationFn: async ({ diaryId, newTitle }: UpdateOne) => await updateOne({ diaryId, newTitle }),
    onSuccess: res => {
      navigation.navigate('Team', { id: res.data.diaryId });
      queryClient.invalidateQueries({ queryKey: myTeamsKey });
      successToast(`${t('toast.updateTeam.success')}`);
    },
    onError: () => {
      errorToast(`${t('toast.updateTeam.fail')}`);
    },
  });

  return { updateTeamMutation };
};

export const usePostOneTeam = () => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const myTeamKey = useKey(['all', QUERY_KEY.TEAM]);
  const { t } = useTranslation();

  const createTeamMutation = useMutation({
    mutationFn: postOne,
    onSuccess: res => {
      queryClient.setQueryData(myTeamKey, (prev: Team[]) => {
        let update = [...prev];
        const newTeam = { ...res.data, photoUrls: Array.isArray(res.data.photoUrls) ? res.data.photoUrls : [res.data.photoUrls], isNew: true };
        if (prev[0] && prev[0].isNew) {
          update.shift();
          update.unshift({ ...prev[0], isNew: false });
        }
        update.unshift(newTeam);
        return update;
      });
      navigation.navigate('Home');
      successToast(`${t('toast.createTeam.success')}`);
    },
    onError: () => {
      errorToast(`${t('toast.createTeam.fail')}`);
    },
  });

  return { createTeamMutation };
};

export const useInviteTeam = () => {
  const { successToast, errorToast } = useToast();
  const { t } = useTranslation();

  const inviteTeamMutation = useMutation({
    mutationFn: async ({ diaryId, profileNames }: TeamInvite) => await postInvite({ diaryId, profileNames }),
    onSuccess: () => {
      successToast(`${t('toast.inviteTeam.success')}`);
    },
    onError: () => {
      errorToast(`${t('toast.inviteTeam.success')}`);
    },
  });

  return { inviteTeamMutation };
};

export const useAcceptTeam = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myTeamReqKey = useKey([QUERY_KEY.MY, 'team', 'request']);
  const myTeamKey = useKey(['all', QUERY_KEY.TEAM]);
  const { t } = useTranslation();

  const acceptTeamMutation = useMutation({
    mutationFn: postAccept,
    onSuccess: async res => {
      successToast(`${t('toast.acceptTeam.success')}`);
      await queryClient.invalidateQueries({ queryKey: myTeamReqKey });
      await queryClient.invalidateQueries({ queryKey: myTeamKey });
      await queryClient.setQueryData(myTeamKey, (prev: Team[]) => {
        let update = [...prev];
        const newTeam = { ...res.data, photoUrls: Array.isArray(res.data.photoUrls) ? res.data.photoUrls : [res.data.photoUrls], isNew: true };
        if (prev[0] && prev[0].isNew) {
          update.shift();
          update.unshift({ ...prev[0], isNew: false });
        }
        update.unshift(newTeam);
        return update;
      });
    },
    onError: () => {
      errorToast(`${t('toast.acceptTeam.fail')}`);
    },
  });

  return { acceptTeamMutation };
};

export const useGetTeamMenu = ({ teamId: diaryId, options }: { teamId: number; options?: Object }) => {
  const queryKey = useKey([QUERY_KEY.TEAM, diaryId, 'menu']);
  const { data, isError, isLoading, refetch } = useQuery<TeamMenu[]>({
    queryKey,
    queryFn: async () => await getMenu(diaryId),
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    ...(options || {}),
  });

  return { data, isError, isLoading, refetch };
};

export const usePostTeamReject = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myTeamReqKey = useKey([QUERY_KEY.MY, 'team', 'request']);
  const { t } = useTranslation();

  const friendRequestMutation = useMutation({
    mutationFn: postTeamReject,
    onSuccess: () => {
      successToast(`${t('toast.rejectTeam.success')}`);
      queryClient.invalidateQueries({ queryKey: myTeamReqKey });
    },
    onError: () => {
      errorToast(`${t('toast.rejectTeam.fail')}`);
    },
  });

  return { friendRequestMutation };
};

export const usePostImmediateInvite = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myTeamKey = useKey(['all', QUERY_KEY.TEAM]);
  const { navigation } = useNavi();
  const { t } = useTranslation();

  const inviteTeamMutation = useMutation({
    mutationFn: async ({ diaryId, profileName }: TeamImmediateInvite) => await postImmediateInvite({ diaryId, profileName }),
    onSuccess: async () => {
      successToast(`${t('toast.immediateInvite.success')}`);
      await queryClient.invalidateQueries({ queryKey: myTeamKey });
      navigation.navigate('Bottom', { screen: 'Home' });
    },
    onError: e => {
      const error = e as BaseAxiosError;
      const { message } = error.response.data;
      errorToast(`${t('toast.immediateInvite.fail')}\n${message}`);
      navigation.navigate('Bottom', { screen: 'Home' });
    },
  });

  return { inviteTeamMutation };
};
