import React, { useRef, useState } from 'react';
import { View, Text, Pressable, NativeSyntheticEvent, NativeScrollEvent, Image, RefreshControl, ScrollView } from 'react-native';
import TeamHeader from '@components/Team/TeamHeader';
import useCurrentRoute from '@hooks/useCurrentRoute';
import BoardItem from '@components/common/BoardItem';
import CalendarStrip from '@components/Team/CalendarStrip/CalendarStrip';
import Badge from '@components/common/Badge';
import moment from 'moment-modification-rn';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import AvatarHappyMsg from '@components/common/AvatarHappyMsg';
import Button from '@components/common/Button';
import CameraIcon from '@assets/icons/CameraIcon';
import blurPng from '@assets/png/blur.png';
import { QUERY_KEY, useGetAllBoard, useKey } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useRefresh from '@hooks/useRefresh';
import { FlashList } from '@shopify/flash-list';
import 'moment-modification-rn/locale/ko';
moment.locale('ko');

interface Props {
  paramName: string;
}

const TeamScreen = ({}: Props) => {
  const [isScrollUp, setIsScrollUp] = useState(true);
  const [isPostsHidden, setIsPostsHidden] = useState(true);
  const lastOffsetY = useRef<number>(0);

  const { route } = useCurrentRoute();
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const { data, isLoading } = useGetAllBoard({ diaryId: route.params.id, date: currentDate });

  const boardsKey = useKey(['all', QUERY_KEY.BOARD, currentDate]);
  const { refreshing, onRefresh } = useRefresh({ queryKey: boardsKey });

  const scrollPosts = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isPostsHidden) return;
    const currentOffsetY = e.nativeEvent.contentOffset.y;
    if (currentOffsetY > lastOffsetY.current && currentOffsetY > 0) {
      setIsScrollUp(false);
    }
    if (currentOffsetY < lastOffsetY.current || currentOffsetY === 0) {
      setIsScrollUp(true);
    }
    lastOffsetY.current = currentOffsetY;
  };

  return (
    <>
      <MotiView
        animate={{ translateY: isScrollUp ? 0 : -138, height: isScrollUp ? 138 : 0 }}
        transition={{
          type: 'timing',
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        }}
        className="bg-white mt-[66px]">
        <CalendarStrip
          style={{ height: 138, backgroundColor: '#fff' }}
          calendarStrip={{ height: 94 }}
          dateNumberStyle={{ color: '#573333', fontFamily: 'Pretendard-SemiBold', fontSize: 14 }}
          dateNameStyle={{ color: '#1C1C1E', fontFamily: 'Pretendard-SemiBold', fontSize: 12 }}
          calendarHeaderContainerStyle={{ height: 0 }}
          leftSelector={[]}
          rightSelector={[]}
          scrollable={true}
          scrollerPaging={true}
          onDateSelected={date => {
            setCurrentDate(moment(date).format('YYYY-MM-DD'));
          }}
          onWeekChanged={(start, end) => console.log(start, end)}
          minDate={moment('2024-09-01')}
          maxDate={moment().add(4, 'days')}
          selectedDate={moment(currentDate)}
          dayComponent={({ date, onDateSelected }) => (
            <Pressable
              onPress={() => {
                onDateSelected(date);
                setCurrentDate(moment(date).format('YYYY-MM-DD'));
              }}
              className={`${moment(date).format('YYYY-MM-DD') === currentDate && 'bg-black200'} relative
              items-center space-y-[6px] h-[70px] justify-center rounded-2xl`}>
              <View className="w-[36px] h-[36px] rounded-[12px] bg-black900 flex justify-center items-center">
                <Text className="text-white text-[14px] font-PTDSemiBold">{date.date()}</Text>
              </View>
              <Text className="text-black900 text-[12x] font-PTDSemiBold">{date.format('ddd')}</Text>
              <View className="absolute top-[-5px] left-[1px]">
                <Badge width={24} height={24} bgColor={'#F04438'} />
              </View>
            </Pressable>
          )}
        />
      </MotiView>
      {isLoading && (
        <View className="pt-[60px] bg-black100">
          <MiniLoading />
        </View>
      )}

      <View className="relative flex-1 bg-black100">
        {data && data.length > 0 && (
          <>
            <FlashList
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              onScroll={scrollPosts}
              data={[...Array(20)]}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item, index }) => <BoardItem key={index} {...item} />}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="h-[18px]" />}
              contentContainerStyle={{ paddingTop: 16, paddingBottom: 30, paddingHorizontal: 16 }}
              initialScrollIndex={0}
              estimatedItemSize={600}
              estimatedFirstItemOffset={16}
            />
            {isPostsHidden && (
              <>
                <Image source={blurPng} className="opacity-100 absolute top-0 w-full h-full" resizeMode="cover" />
                <View className="absolute h-full justify-center items-center w-full transform translate-y-[-20px]" pointerEvents="box-none">
                  <AvatarHappyMsg message={`오늘의 일상을 업로드하면\n친구들의 일상을 볼 수 있어요!`} />
                  <View className="mt-[24px]">
                    <Button size="mid" customStyle={{ width: 170 }} icon={<CameraIcon height={24} width={24} />}>
                      내 일상 공유하기
                    </Button>
                  </View>
                </View>
              </>
            )}
          </>
        )}
        {(!data || data?.length === 0) && !isLoading && (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className="pt-[60px]">
              <AvatarSadMsg message={`아무도 글을\n작성하지 않았어요`} />
            </View>
          </ScrollView>
        )}
      </View>

      <TeamHeader title="아줌마들의 우정은 디질때까지" />
    </>
  );
};

export default TeamScreen;
