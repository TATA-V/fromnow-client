import React from 'react';
import { FlatList, View, RefreshControl } from 'react-native';
import BoardItem from '@components/common/BoardItem';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import MiniLoading from '@components/common/MiniLoading';
import { useGetAllMyLikedPost, useKey, QUERY_KEY } from '@hooks/query';
import useRefresh from '@hooks/useRefresh';

const MyLikedBoardScreen = () => {
  const { data, isLoading } = useGetAllMyLikedPost();
  const { refreshing, onRefresh } = useRefresh({ queryKey: useKey([QUERY_KEY.MY, 'liked', 'posts']) });

  if (isLoading) return <MiniLoading />;

  return (
    <View className="flex-1 bg-black100">
      {data.length > 0 && (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={data}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => <BoardItem key={index} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-[18px]" />}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 30, paddingHorizontal: 16 }}
        />
      )}
      {data.length === 0 && (
        <View className="h-full justify-center transform translate-y-[-66px]">
          <AvatarSadMsg message={`아직 좋아요를 누른\n게시글이 없어요`} />
        </View>
      )}
    </View>
  );
};

export default MyLikedBoardScreen;
