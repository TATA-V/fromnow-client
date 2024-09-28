import { useMutation, useQuery } from '@tanstack/react-query';
import { Board, CreateBoard } from '@clientTypes/board';
import { GetAll, getAll, postDisLike, postLike, postOne } from '@api/board';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';

export const useGetAllBoard = (boardData: GetAll) => {
  const { data, isError, isLoading } = useQuery<Board[]>({
    queryKey: useKey(['all', QUERY_KEY.BOARD, boardData.date]),
    queryFn: () => getAll(boardData),
    staleTime: 0,
    gcTime: 0,
  });

  return { data, isError, isLoading };
};

export const usePostOneBoard = () => {
  const { successToast, errorToast } = useToast();

  const createBoardMutation = useMutation({
    mutationFn: ({ diaryId, uploadPhotos, createDiaryDto }: CreateBoard) => postOne({ diaryId, uploadPhotos, createDiaryDto }),
    onSuccess: () => {
      successToast('게시글 작성이 완료되었습니다.');
    },
    onError: () => {
      errorToast('게시글 작성에 실채했습니다.');
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
