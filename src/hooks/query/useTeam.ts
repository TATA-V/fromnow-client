import { Team, TeamInvite } from '@clientTypes/team';
import { deleteOne, getAll, postAccept, postInvite, postOne, UpdateOne, updateOne } from '@api/team';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useToast from '@hooks/useToast';
import useNavi from '@hooks/useNavi';
import { QUERY_KEY, useKey } from '@hooks/query';

export const useGetAllTeam = () => {
  const { data, isError, isLoading } = useQuery<Team[]>({
    queryKey: useKey(['all', QUERY_KEY.TEAM]),
    queryFn: getAll,
  });

  return { data, isError, isLoading };
};

export const useDeleteOneTeam = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();
  const queryClient = useQueryClient();

  const deleteTeamMutation = useMutation({
    mutationFn: deleteOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: useKey(['all', QUERY_KEY.TEAM]) });
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

  const updateTeamMutation = useMutation({
    mutationFn: ({ diaryId, newTitle }: UpdateOne) => updateOne({ diaryId, newTitle }),
    onSuccess: () => {
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

  const createTeamMutation = useMutation({
    mutationFn: postOne,
    onSuccess: res => {
      queryClient.setQueryData(['all', QUERY_KEY.TEAM], (prev: Team[]) => {
        return [res.data, ...prev];
      });
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
