import React from 'react';
import { FlatList, View } from 'react-native';
import PostItem from '@components/common/PostItem';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import MiniLoading from '@components/common/MiniLoading';
import { useGetAllMyLikedPost } from '@hooks/query';

const MyLikedPostScreen = () => {
  const { data, isLoading } = useGetAllMyLikedPost();
  if (isLoading) return <MiniLoading />;

  return (
    <View className="flex-1 bg-black100">
      {data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => <PostItem key={index} />}
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

export default MyLikedPostScreen;
