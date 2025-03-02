import React from 'react';
import { View, RefreshControl, ScrollView } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import TeamDetailHeader from '@components/Team/TeamDetailHeader';
import BoardItem from '@components/common/BoardItem';
import { QUERY_KEY, useGetAllBoard, useKey } from '@hooks/query';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useRefresh from '@hooks/useRefresh';
import { FlashList } from '@shopify/flash-list';
import FullScreenMiniLoading from '@components/common/FullScreenMiniLoading';
import { getDate } from '@utils/formatDate';
import { useTranslation } from 'react-i18next';
import { isKo } from '@utils/localize';

interface Props {
  paramName: string;
}

const TeamDetailScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  const date = route.params.date;
  const diaryId = route.params.teamId;
  const { data, isLoading } = useGetAllBoard({ diaryId, date });
  const boardKey = useKey(['all', QUERY_KEY.BOARD, date]);
  const { refreshing, onRefresh } = useRefresh({ queryKey: boardKey });
  const formattedDate = getDate(date)
    .utcOffset(9)
    .format(isKo() ? 'YYYY년 MM월 DD일 dddd' : 'MMMM DD, YYYY');
  const boards = data?.boardOverViewResponseDtoList;
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <>
        <TeamDetailHeader title={formattedDate} />
        <FullScreenMiniLoading bgColor="#fff" />
      </>
    );
  }

  return (
    <>
      {data && boards.length > 0 && (
        <View className="pt-[74px] flex-1">
          <FlashList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={boards}
            keyExtractor={item => item.boardId.toString()}
            renderItem={({ item, index }) => <BoardItem key={index} {...item} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-[18px]" />}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 30, paddingHorizontal: 16 }}
            initialScrollIndex={boards.length > 0 ? 0 : undefined}
            estimatedItemSize={600}
            estimatedFirstItemOffset={8}
          />
        </View>
      )}
      <TeamDetailHeader title={formattedDate} />
      {(!data || boards.length === 0) && !isLoading && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View className="h-full justify-center mt-[-66px]">
            <AvatarSadMsg message={t('avatar.noPosts')} />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default TeamDetailScreen;
