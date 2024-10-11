import { Team, TeamInvite } from '@clientTypes/team';
import { deleteOne, getAll, postAccept, postInvite, postOne, UpdateOne, updateOne } from '@api/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import { QUERY_KEY, useKey } from '@hooks/query';

export const useGetAllTeam = () => {
  const queryKey = useKey(['all', QUERY_KEY.TEAM]);
  const { data, isError, isLoading } = useQuery<Team[]>({
    queryKey,
    queryFn: getAll,
  });

  return { data, isError, isLoading };
};

export const useDeleteOneTeam = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);

  const deleteTeamMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myTeamsKey });
      navigation.navigate('Home');
      successToast('다이어리를 삭제했습니다.');
    },
    onError: error => {
      console.error('Error deleting team:', error);
      errorToast('다이어리 삭제에 실패했습니다.');
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
    mutationFn: ({ diaryId, newTitle }: UpdateOne) => updateOne({ diaryId, newTitle }),
    onSuccess: res => {
      navigation.navigate('Team', { id: res.data.diaryId });
      queryClient.invalidateQueries({ queryKey: myTeamsKey });
      successToast('다이어리 이름을 수정했습니다.');
    },
    onError: error => {
      errorToast('다이어리 이름 수정에 실패했습니다.');
    },
  });

  return { updateTeamMutation };
};

export const usePostOneTeam = () => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const myTeamsKey = useKey(['all', QUERY_KEY.TEAM]);

  const createTeamMutation = useMutation({
    mutationFn: postOne,
    onSuccess: res => {
      queryClient.setQueryData(myTeamsKey, (prev: Team[]) => {
        let update = [...prev];
        const newTeam = { ...res.data, photoUrls: [res.data.photoUrls], isNew: true };
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
    mutationFn: ({ diaryId, profileName }: TeamInvite) => postInvite({ diaryId, profileName }),
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

  const acceptTeamMutation = useMutation({
    mutationFn: postAccept,
    onSuccess: () => {
      successToast('다이어리 초대 수락이 완료되었습니다.');
    },
    onError: () => {
      errorToast('다이어리 초대 수락에 실패했습니다.');
    },
  });

  return { acceptTeamMutation };
};
