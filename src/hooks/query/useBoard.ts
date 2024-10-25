import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AllBoard, Board, CreateBoard, LikeDislikeParams } from '@clientTypes/board';
import {
  GetAll,
  getAll,
  getColCalendar,
  getRowInfiniteCalendar,
  RowColCalendar,
  postDisLike,
  postLike,
  postOne,
  PostRead,
  postRead,
} from '@api/board';
import useToast from '@hooks/useToast';
import { QUERY_KEY, useKey } from '@hooks/query';
import useNavi from '@hooks/useNavi';
import { SheetManager } from 'react-native-actions-sheet';
import moment from 'moment-modification-rn';
import { CalendarCol } from '@clientTypes/calendar';
import { formatDate } from '@utils/formatDate';
import { Team } from '@clientTypes/team';

export const useGetAllBoard = (boardData: GetAll) => {
  const queryKey = useKey(['all', QUERY_KEY.BOARD, boardData.diaryId, boardData.date]);
  const { data, isError, error, isLoading } = useQuery<AllBoard>({
    queryKey,
    queryFn: () => getAll(boardData),
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isError, error, isLoading };
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

export const useLikeBoard = ({ diaryId, boardId, date }: LikeDislikeParams) => {
  const format = formatDate(date);
  const boardsKey = useKey(['all', QUERY_KEY.BOARD, diaryId, format]);
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const likeBoardMutation = useMutation({
    mutationFn: postLike,
    onSuccess: () => {
      successToast('좋아요 완료!');
      queryClient.setQueryData(boardsKey, (prev: AllBoard) => {
        const update = prev.boardOverViewResponseDtoList.map(v => (v.boardId === boardId ? { ...v, liked: true, likes: v.likes + 1 } : v));
        return { ...prev, boardOverViewResponseDtoList: update };
      });
    },
    onError: () => {
      errorToast('좋아요에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    },
  });

  return { likeBoardMutation };
};

export const useDisLikeBoard = ({ diaryId, boardId, date }: LikeDislikeParams) => {
  const format = formatDate(date);
  const boardsKey = useKey(['all', QUERY_KEY.BOARD, diaryId, format]);
  const { successToast, errorToast } = useToast();
  const queryClient = useQueryClient();

  const disLikeBoardMutation = useMutation({
    mutationFn: postDisLike,
    onSuccess: () => {
      successToast('좋아요를 취소했습니다.');
      queryClient.setQueryData(boardsKey, (prev: AllBoard) => {
        const update = prev.boardOverViewResponseDtoList.map(v => (v.boardId === boardId ? { ...v, liked: false, likes: v.likes - 1 } : v));
        return { ...prev, boardOverViewResponseDtoList: update };
      });
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

export const useRowInfiniteCalendar = ({ diaryId }: Pick<RowColCalendar, 'diaryId'>) => {
  const queryKey = useKey(['row', QUERY_KEY.BOARD, diaryId]);
  const { data, isLoading, isError, fetchPreviousPage, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey,
    initialPageParam: { diaryId, date: moment().format() },
    queryFn: async ({ pageParam }) => getRowInfiniteCalendar({ diaryId: pageParam.diaryId, date: pageParam.date }),
    getNextPageParam: () => ({ diaryId, date: moment().add(1, 'months').toISOString() }),
    getPreviousPageParam: firstPage => {
      const prevDate = moment(firstPage[0].date).subtract(1, 'month').toISOString();
      return { diaryId, date: prevDate };
    },
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isLoading, isError, fetchPreviousPage, fetchNextPage, hasNextPage, isFetching };
};

// useInfiniteQuery를 사용하지 않은 이유: 1월부터 10월까지의 달력이 있고, 현재 10월일 때 천천히 스크롤하지 않고 빠르게 올리면 3월 달력이 바로 나타남
export const useColCalendar = ({ diaryId, date, num = 2 }: RowColCalendar) => {
  const queryKey = useKey(['col', QUERY_KEY.BOARD, diaryId, date]);
  const { data, isError, isLoading } = useQuery<CalendarCol[]>({
    queryKey,
    queryFn: () => getColCalendar({ diaryId, date, num }),
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });

  return { data, isError, isLoading };
};
