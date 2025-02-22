import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AllBoard, CreateBoard } from '@clientTypes/board';
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
import { CalendarCol } from '@clientTypes/calendar';
import { getDate } from '@utils/formatDate';
import { useEffect, useState } from 'react';

export const useGetAllBoard = (boardData: GetAll) => {
  const queryKey = useKey(['all', QUERY_KEY.BOARD, boardData.diaryId, boardData.date]);
  const { data, isError, error, isLoading, refetch } = useQuery<AllBoard>({
    queryKey,
    queryFn: async () => await getAll(boardData),
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
  });

  return { data, isError, error, isLoading, refetch };
};

export const usePostOneBoard = () => {
  const { successToast, errorToast } = useToast();
  const { navigation } = useNavi();

  const createBoardMutation = useMutation({
    mutationFn: async ({ uploadPhotos, chooseDiaryDto }: CreateBoard) => await postOne({ uploadPhotos, chooseDiaryDto }),
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
    mutationFn: async ({ diaryId, date }: PostRead) => await postRead({ diaryId, date }),
    onSuccess: async res => {
      const { diaryId, date } = res;
      const allBoardKey = [...boardKey, 'all', diaryId, date];
      await queryClient.setQueryData(allBoardKey, (prev: AllBoard) => ({ ...prev, read: true }));
      await queryClient.invalidateQueries({ queryKey: ['row', ...boardKey, diaryId] });
    },
  });

  return { readBoardMutation };
};

export const useRowInfiniteCalendar = ({ diaryId, options }: Pick<RowColCalendar, 'diaryId'> & { options?: Object }) => {
  const queryKey = useKey(['row', QUERY_KEY.BOARD, diaryId]);
  const { data, isLoading, isError, error, refetch, fetchPreviousPage, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey,
    initialPageParam: { diaryId, date: getDate().utcOffset(9).format() },
    queryFn: async ({ pageParam }) => await getRowInfiniteCalendar({ diaryId: pageParam.diaryId, date: pageParam.date }),
    getNextPageParam: lastPage => {
      const nextDate = getDate(lastPage[0]?.date).utcOffset(9).add(1, 'months').toISOString();
      return { diaryId, date: nextDate };
    },
    getPreviousPageParam: firstPage => {
      const prevDate = getDate(firstPage[0]?.date).utcOffset(9).subtract(1, 'month').toISOString();
      return { diaryId, date: prevDate };
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
    ...(options || {}),
  });

  return { data, isLoading, error, isError, refetch, fetchPreviousPage, fetchNextPage, hasNextPage, isFetching };
};

// useInfiniteQuery를 사용하지 않은 이유: 1월부터 10월까지의 달력이 있고, 현재 10월일 때 천천히 스크롤하지 않고 빠르게 올리면 3월 달력이 바로 나타남
export const useColCalendar = ({ diaryId, date, num = 2 }: RowColCalendar) => {
  const [calendarData, setCalendarData] = useState<CalendarCol[]>([]);

  const queryKey = useKey(['col', QUERY_KEY.BOARD, diaryId, date]);
  const { data, isLoading, isFetching, isError, error } = useQuery<CalendarCol[]>({
    queryKey,
    queryFn: async () => await getColCalendar({ diaryId, date, num }),
    staleTime: 0,
    gcTime: 1000 * 60 * 10,
    enabled: !!diaryId && !!date && !!num,
  });

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (data && data.length > 0) {
      setCalendarData(data);
    }
  }, [data]);

  return { data, calendarData, isLoading, isError, error };
};
