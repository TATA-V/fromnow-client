import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, RefreshControl, ScrollView } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import BoardItem from '@components/common/BoardItem';
import CalendarStrip from '@components/Team/CalendarStrip/CalendarStrip';
import Badge from '@components/common/Badge';
import moment, { Moment } from 'moment-modification-rn';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import AvatarHappyMsg from '@components/common/AvatarHappyMsg';
import Button from '@components/common/Button';
import CameraIcon from '@assets/icons/CameraIcon';
import blurPng from '@assets/png/blur.png';
import { QUERY_KEY, useGetAllBoard, useKey, useReadBoard, useRowInfiniteCalendar } from '@hooks/query';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useRefresh from '@hooks/useRefresh';
import { FlashList } from '@shopify/flash-list';
import useNavi from '@hooks/useNavi';
import { formatDate } from '@utils/formatDate';
import { CalendarRow, CalendarRowMap } from '@clientTypes/calendar';
import { useScrollDirection } from '@hooks/useScrollDirection';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import FullScreenMiniLoading from '@components/common/FullScreenMiniLoading';
import { useIsFocused } from '@react-navigation/native';
import 'moment-modification-rn/locale/ko';
import { getAll, getRowInfiniteCalendar } from '@api/board';
import { useQueryClient } from '@tanstack/react-query';
moment.locale('ko');

interface Props {
  paramName: string;
}

const TeamScreen = ({}: Props) => {
  const [week, setWeek] = useState<Moment | string>(moment().utcOffset(9).format());
  const { navigation } = useNavi();
  const isFocused = useIsFocused();
  const { isScrollUp, scrollList } = useScrollDirection();
  const { recivedAt: teamDate, targetDate } = useSelectedTeamStore();

  const { route } = useCurrentRoute();
  const diaryId = route.params.id;
  const [calendarMap, setCalendarMap] = useState<CalendarRowMap>({});
  const [currentDate, setCurrentDate] = useState(targetDate);
  const { data, isLoading } = useGetAllBoard({ diaryId, date: currentDate });
  const { data: calendarData, fetchPreviousPage, refetch } = useRowInfiniteCalendar({ diaryId });
  const boards = data?.boardOverViewResponseDtoList;
  // console.log('data?.blur', data?.blur);
  // console.log('calendarData:', calendarData);
  // console.log('calendarMap:', calendarMap);
  // data && console.log('data:', data);

  const rowKey = useKey(['row', QUERY_KEY.BOARD, diaryId]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!isFocused) return;
    queryClient.removeQueries({ queryKey: rowKey });
    refetch();
  }, [isFocused]);

  // 읽음 처리
  const { readBoardMutation } = useReadBoard();
  useEffect(() => {
    if (!data || data.blur || data.read) return;
    const hasNewPosts = boards.length !== 0;
    if (hasNewPosts) {
      readBoardMutation.mutate({ diaryId, date: currentDate });
    }
  }, [data?.blur, data?.read, boards, diaryId, currentDate]);

  const boardsKey = useKey(['all', QUERY_KEY.BOARD, currentDate]);
  const { refreshing, onRefresh } = useRefresh({ queryKey: boardsKey });

  const onWeekChanged = async (start: Moment, _) => {
    const startYearMonth = moment(start).format('YYYY-MM');
    if (startYearMonth === moment(week).format('YYYY-MM')) return;
    setWeek(start);
    if (calendarMap[`${startYearMonth}-01`]) return;
    await fetchPreviousPage();
  };

  useEffect(() => {
    if (!calendarData) return;
    const mappedData = calendarData?.pages[0].reduce((acc: CalendarRowMap, item: CalendarRow) => {
      const format = formatDate(item.date);
      acc[format] = item;
      return acc;
    }, {});
    setCalendarMap(prev => {
      if (JSON.stringify(prev) === JSON.stringify(mappedData)) {
        return prev;
      }
      return { ...mappedData, ...prev };
    });
  }, [calendarData]);
  useEffect(() => {
    let dayData = calendarMap[currentDate];
    if (!data?.blur && data?.read && dayData?.new) {
      dayData.new = false;
      setCalendarMap(prev => ({ ...prev, dayData }));
    }
  }, [data?.blur, data?.read, boards, currentDate, calendarMap]);

  const onDateSelected = async (date: Moment) => {
    const format = formatDate(date);
    setCurrentDate(format);
  };

  return (
    <>
      <MotiView
        animate={{ translateY: isScrollUp ? 0 : -94, height: isScrollUp ? 94 : 0, backgroundColor: '#FBFBFD' }}
        transition={{
          type: 'timing',
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }}
        className="bg-white">
        <CalendarStrip
          style={{ height: 94, backgroundColor: '#fff' }}
          calendarStrip={{ height: 94 }}
          dateNumberStyle={{ color: '#573333', fontFamily: 'Pretendard-SemiBold', fontSize: 14 }}
          dateNameStyle={{ color: '#1C1C1E', fontFamily: 'Pretendard-SemiBold', fontSize: 12 }}
          calendarHeaderContainerStyle={{ height: 0 }}
          leftSelector={[]}
          rightSelector={[]}
          scrollable={true}
          scrollerPaging={true}
          onDateSelected={onDateSelected}
          onWeekChanged={onWeekChanged}
          minDate={formatDate() === moment(teamDate).toString() ? moment(teamDate) : moment(teamDate).subtract('4', 'days')}
          maxDate={moment().add(4, 'days')}
          selectedDate={moment(currentDate)}
          dayComponent={({ date, onDateSelected }) => {
            const format = formatDate(date.toISOString());
            const dayData = calendarMap[format];

            return (
              <Pressable
                onPress={() => {
                  onDateSelected(date);
                  setCurrentDate(moment(date).format('YYYY-MM-DD'));
                }}
                className={`${moment(date).format('YYYY-MM-DD') === currentDate && 'bg-black200'} relative
                items-center space-y-[6px] h-[70px] justify-center rounded-2xl`}>
                <View
                  className={`${dayData?.hasPosts ? 'bg-black900' : 'bg-black300'}
                  w-[36px] h-[36px] rounded-[12px] flex justify-center items-center`}>
                  <Text className="text-white text-[14px] font-PTDSemiBold">{date.date()}</Text>
                </View>
                <Text className={`${dayData?.hasPosts ? 'text-black900' : 'text-black300'} text-[12x] font-PTDSemiBold`}>{date.format('ddd')}</Text>
                {dayData?.new && (
                  <View className="absolute top-[-5px] left-[1px]">
                    <Badge width={24} height={24} bgColor={'#F04438'} />
                  </View>
                )}
              </Pressable>
            );
          }}
        />
      </MotiView>
      {isLoading && <FullScreenMiniLoading translateY="0" />}

      <View className="relative flex-1 bg-black100">
        {data && boards.length > 0 && (
          <>
            <FlashList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              onScroll={scrollList}
              data={boards}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item, index }) => <BoardItem key={index} {...item} />}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="h-[18px]" />}
              contentContainerStyle={{ paddingTop: 16, paddingBottom: 30, paddingHorizontal: 16 }}
              initialScrollIndex={0}
              estimatedItemSize={600}
            />
            {data && boards.length > 0 && data.blur && (
              <>
                <Image source={blurPng} className="opacity-100 absolute top-0 w-full h-full" resizeMode="cover" />
                <View className="absolute h-full justify-center items-center w-full transform translate-y-[-50px]" pointerEvents="box-none">
                  <AvatarHappyMsg message={`오늘의 일상을 업로드하면\n친구들의 일상을 볼 수 있어요!`} />
                  <View className="mt-[24px]">
                    {formatDate() === formatDate(data[0]?.createdDate) && (
                      <Button
                        onPress={() => navigation.navigate('Camera')}
                        size="mid"
                        customStyle={{ width: 170 }}
                        icon={<CameraIcon height={24} width={24} />}>
                        내 일상 공유하기
                      </Button>
                    )}
                  </View>
                </View>
              </>
            )}
          </>
        )}
        {(!data || data?.boardOverViewResponseDtoList.length === 0) && !isLoading && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className="flex justify-center items-center h-full translate-y-[-66px]">
              <AvatarSadMsg message={`아무도 글을\n작성하지 않았어요`} />
            </View>
          </ScrollView>
        )}
      </View>
    </>
  );
};

export default TeamScreen;
