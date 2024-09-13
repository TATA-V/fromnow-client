import React from 'react';
import { View, FlatList } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import TeamDetailHeader from '@components/Team/TeamDetailHeader';
import PostItem from '@components/common/PostItem';

interface Props {
  paramName: string;
}

const TeamDetailScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  console.log('teamId:', route.params.teamId);
  console.log('postDate:', route.params.postDate);

  return (
    <>
      <View className="pt-[74px]">
        <FlatList
          data={[...Array(20)]}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => <PostItem key={index} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-[18px]" />}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 30, paddingHorizontal: 16 }}
        />
      </View>
      <TeamDetailHeader title="0000년 00월 00일 토요일" />
    </>
  );
};

export default TeamDetailScreen;
