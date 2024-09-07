import React from 'react';
import { FlatList, View } from 'react-native';
import PostItem from '@components/common/PostItem';

const MyLikedPostScreen = () => {
  return (
    <View className="flex-1 bg-black100">
      <FlatList
        data={[...Array(20)]}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => <PostItem key={index} />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-[18px]" />}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 30, paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default MyLikedPostScreen;
