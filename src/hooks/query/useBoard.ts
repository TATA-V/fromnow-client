import { useMutation, useQuery } from '@tanstack/react-query';
import { Board, CreateBoard } from '@clientTypes/board';
import { GetAll, getAll, postDisLike, postLike, postOne } from '@api/board';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';
import useNavi from '@hooks/useNavi';
import { SheetManager } from 'react-native-actions-sheet';

export const useGetAllBoard = (boardData: GetAll) => {
  const queryKey = useKey(['all', QUERY_KEY.BOARD, boardData.date]);
  const { data, isError, isLoading } = useQuery<Board[]>({
    queryKey,
    queryFn: () => getAll(boardData),
    staleTime: 0,
    gcTime: 0,
  });

  return { data, isError, isLoading };
};

export const usePostOneBoard = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();

  const createBoardMutation = useMutation({
    mutationFn: ({ uploadPhotos, chooseDiaryDto }: CreateBoard) => postOne({ uploadPhotos, chooseDiaryDto }),
    onSuccess: () => {
      navigation.navigate('Home');
      SheetManager.hide('select-team');
      successToast('게시글 작성 완료!');
    },
    onError: () => {
      errorToast('게시글 작성에 실패했습니다.');
    },
  });

  return { createBoardMutation };
};

export const useLikeBoard = () => {
  const likeBoardMutation = useMutation({
    mutationFn: postLike,
    onSuccess: () => {},
    onError: () => {},
  });

  return { likeBoardMutation };
};

export const useDisLikeBoard = () => {
  const disLikeBoardMutation = useMutation({
    mutationFn: postDisLike,
    onSuccess: () => {},
    onError: () => {},
  });

  return { disLikeBoardMutation };
};
