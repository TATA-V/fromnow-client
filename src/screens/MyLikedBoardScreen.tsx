import React from 'react';
import { View, RefreshControl, ScrollView } from 'react-native';
import BoardItem from '@components/common/BoardItem';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import MiniLoading from '@components/common/MiniLoading';
import { useGetAllMyLikedPost, useKey, QUERY_KEY } from '@hooks/query';
import useRefresh from '@hooks/useRefresh';
import { FlashList } from '@shopify/flash-list';

const MyLikedBoardScreen = () => {
  const { data, isLoading } = useGetAllMyLikedPost();
  const myLikedPostsKey = useKey([QUERY_KEY.MY, 'liked', 'posts']);
  const { refreshing, onRefresh } = useRefresh({ queryKey: myLikedPostsKey });

  if (isLoading) return <MiniLoading />;

  return (
    <View className="flex-1 bg-black100">
      {data.length > 0 && (
        <FlashList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          data={data}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => <BoardItem key={index} {...item} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-[18px]" />}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 30, paddingHorizontal: 16 }}
          initialScrollIndex={0}
          estimatedItemSize={600}
          estimatedFirstItemOffset={8}
        />
      )}
      {data.length === 0 && (
        // <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View className="h-full justify-center transform translate-y-[-66px]">
            <AvatarSadMsg message={`아직 좋아요를 누른\n게시글이 없어요`} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyLikedBoardScreen;
