import { Team, TeamInvite, TeamImmediateInvite, TeamMenu } from '@clientTypes/team';
import { deleteOne, getAll, getMenu, postAccept, postImmediateInvite, postInvite, postOne, postTeamReject, UpdateOne, updateOne } from '@api/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import { QUERY_KEY, useKey } from '@hooks/query';
import { useToastModal } from '@components/Modal';
import { BaseAxiosError } from '@clientTypes/base';
import { Alert } from 'react-native';

export const useGetAllTeam = () => {
  const queryKey = useKey(['all', QUERY_KEY.TEAM]);
  const { data, isError, error, isLoading } = useQuery<Team[]>({
    queryKey,
    queryFn: getAll,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 7,
  });

  return { data, isError, error, isLoading };
};

export const useDeleteOneTeam = (toastModal?: boolean) => {
  const { successToast, errorToast } = useToast();
  const { showToastModal } = useToastModal();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);

  const deleteTeamMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: myTeamsKey });
      await queryClient.refetchQueries({ queryKey: myTeamsKey });
      navigation.navigate('Home');
      toastModal ? showToastModal({ type: 'success', message: '다이어리를 삭제했습니다.' }) : successToast('다이어리를 삭제했습니다.');
    },
    onError: () => {
      toastModal ? showToastModal({ type: 'error', message: '다이어리 삭제에 실패했습니다.' }) : errorToast('다이어리 삭제에 실패했습니다.');
    },
  });

  return { deleteTeamMutation };
};

export const useUpdateOneTeam = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);

  const updateTeamMutation = useMutation({
    mutationFn: async ({ diaryId, newTitle }: UpdateOne) => await updateOne({ diaryId, newTitle }),
    onSuccess: res => {
      navigation.navigate('Team', { id: res.data.diaryId });
      queryClient.invalidateQueries({ queryKey: myTeamsKey });
      successToast('다이어리 이름을 수정했습니다.');
    },
    onError: () => {
      errorToast('다이어리 이름 수정에 실패했습니다.');
    },
  });

  return { updateTeamMutation };
};

export const usePostOneTeam = () => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const myTeamKey = useKey(['all', QUERY_KEY.TEAM]);

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
      successToast('새로운 다이어리가 생성되었습니다.');
    },
    onError: () => {
      errorToast('다이어리 생성에 실패했습니다.');
    },
  });

  return { createTeamMutation };
};

export const useInviteTeam = () => {
  const { successToast, errorToast } = useToast();

  const inviteTeamMutation = useMutation({
    mutationFn: async ({ diaryId, profileNames }: TeamInvite) => await postInvite({ diaryId, profileNames }),
    onSuccess: () => {
      successToast('초대 성공!');
    },
    onError: () => {
      errorToast('초대에 실패했습니다.');
    },
  });

  return { inviteTeamMutation };
};

export const useAcceptTeam = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myTeamReqKey = useKey([QUERY_KEY.MY, 'team', 'request']);
  const myTeamKey = useKey(['all', QUERY_KEY.TEAM]);

  const acceptTeamMutation = useMutation({
    mutationFn: postAccept,
    onSuccess: async res => {
      successToast('다이어리 초대 수락이 완료되었습니다.');
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
      errorToast('다이어리 초대 수락에 실패했습니다.');
    },
  });

  return { acceptTeamMutation };
};

export const useGetTeamMenu = ({ teamId: diaryId, options }: { teamId: number; options?: Object }) => {
  const queryKey = useKey([QUERY_KEY.TEAM, diaryId, 'menu']);
  const { data, isError, isLoading, refetch } = useQuery<TeamMenu[]>({
    queryKey,
    queryFn: async () => await getMenu(diaryId),
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 5,
    ...(options || {}),
  });

  return { data, isError, isLoading, refetch };
};

export const usePostTeamReject = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myTeamReqKey = useKey([QUERY_KEY.MY, 'team', 'request']);

  const friendRequestMutation = useMutation({
    mutationFn: postTeamReject,
    onSuccess: () => {
      successToast('모임 요청 삭제 완료');
      queryClient.invalidateQueries({ queryKey: myTeamReqKey });
    },
    onError: () => {
      errorToast('모임 요청 삭제에 실패했습니다.');
    },
  });

  return { friendRequestMutation };
};

export const usePostImmediateInvite = () => {
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();
  const myTeamKey = useKey(['all', QUERY_KEY.TEAM]);
  const { navigation } = useNavi();

  const inviteTeamMutation = useMutation({
    mutationFn: async ({ diaryId, profileName }: TeamImmediateInvite) => await postImmediateInvite({ diaryId, profileName }),
    onSuccess: async () => {
      successToast('다이어리에 초대되었습니다🎉');
      await queryClient.invalidateQueries({ queryKey: myTeamKey });
      navigation.navigate('Bottom', { screen: 'Home' });
    },
    onError: e => {
      const error = e as BaseAxiosError;
      const { message } = error.response.data;
      errorToast(`다이어리 초대 받기에 실패했어요.\n${message}`);
      navigation.navigate('Bottom', { screen: 'Home' });
    },
  });

  return { inviteTeamMutation };
};
