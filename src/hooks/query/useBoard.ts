import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AllBoard, CreateBoard } from '@clientTypes/board';
import { GetAll, getAll, GetMonthly, getMonthly, postDisLike, postLike, postOne, PostRead, postRead } from '@api/board';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';
import useNavi from '@hooks/useNavi';
import { SheetManager } from 'react-native-actions-sheet';
import moment from 'moment-modification-rn';

export const useGetAllBoard = (boardData: GetAll) => {
  const queryKey = useKey(['all', QUERY_KEY.BOARD, boardData.diaryId, boardData.date]);
  const { data, isError, isLoading } = useQuery<AllBoard>({
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
  const { successToast, errorToast } = useToast();

  const likeBoardMutation = useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      successToast('좋아요 완료!');
    },
    onError: () => {
      errorToast('좋아요에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    },
  });

  return { likeBoardMutation };
};

export const useDisLikeBoard = () => {
  const { successToast, errorToast } = useToast();

  const disLikeBoardMutation = useMutation({
    mutationFn: postDisLike,
    onSuccess: () => {
      successToast('좋아요를 취소했습니다.');
    },
    onError: () => {
      errorToast('좋아요 취소에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    },
  });

  return { disLikeBoardMutation };
};

export const useReadBoard = () => {
  const queryClient = useQueryClient();
  const boardKey = useKey([QUERY_KEY.BOARD]);

  const readBoardMutation = useMutation({
    mutationFn: ({ diaryId, date }: PostRead) => postRead({ diaryId, date }),
    onSuccess: res => {
      const { diaryId, date } = res;
      const allBoardKey = [...boardKey, 'all', diaryId, date];
      queryClient.setQueryData(allBoardKey, (prev: AllBoard) => ({ ...prev, read: true }));
      queryClient.invalidateQueries({ queryKey: ['row', ...boardKey, diaryId] });
    },
  });

  return { readBoardMutation };
};

export const useRowInfiniteBoard = ({ diaryId }: Omit<GetMonthly, 'date'>) => {
  const queryKey = useKey(['row', QUERY_KEY.BOARD, diaryId]);
  const { data, isLoading, isError, fetchPreviousPage, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey,
    initialPageParam: { diaryId, date: moment().format() },
    queryFn: async ({ pageParam }) => getMonthly({ diaryId: pageParam.diaryId, date: pageParam.date }),
    getNextPageParam: () => ({ diaryId, date: moment().add(1, 'months').toISOString() }),
    getPreviousPageParam: firstPage => {
      const prevDate = moment(firstPage[0].date).subtract(1, 'month').toISOString();
      return { diaryId, date: prevDate };
    },
    staleTime: 0,
    gcTime: 0,
  });

  return { data, isLoading, isError, fetchPreviousPage, fetchNextPage, hasNextPage, isFetching };
};

export const useColumnInfiniteBoard = () => {};
