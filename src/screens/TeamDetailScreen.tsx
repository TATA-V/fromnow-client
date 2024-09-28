import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import TeamDetailHeader from '@components/Team/TeamDetailHeader';
import BoardItem from '@components/common/BoardItem';
import { QUERY_KEY, useGetAllBoard, useKey } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useRefresh from '@hooks/useRefresh';
import moment from 'moment-modification-rn';
import 'moment-modification-rn/locale/ko';
moment.locale('ko');

interface Props {
  paramName: string;
}

const TeamDetailScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  const { data, isLoading } = useGetAllBoard({ diaryId: route.params.teamId, date: route.params.date });
  const { refreshing, onRefresh } = useRefresh({ queryKey: useKey(['all', QUERY_KEY.BOARD, route.params.date]) });
  const formattedDate = moment(route.params.date).format('YYYY년 MM월 DD일 dddd');

  if (isLoading) {
    return (
      <>
        <TeamDetailHeader title={formattedDate} />
        <View className="pt-[66px]">
          <MiniLoading />
        </View>
      </>
    );
  }

  return (
    <>
      {data && data.length > 0 && (
        <View className="pt-[74px]">
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            data={[...Array(20)]}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item, index }) => <BoardItem key={index} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-[18px]" />}
            contentContainerStyle={{ paddingTop: 8, paddingBottom: 30, paddingHorizontal: 16 }}
          />
        </View>
      )}
      <TeamDetailHeader title={formattedDate} />
      {data && data.length === 0 && (
        <View className="h-full justify-center mt-[-66px]">
          <AvatarSadMsg message={`아직 아무도 글을\n작성하지 않았어요`} />
        </View>
      )}
    </>
  );
};

export default TeamDetailScreen;
