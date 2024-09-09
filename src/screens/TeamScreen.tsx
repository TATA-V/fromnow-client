import React from 'react';
import { View, FlatList } from 'react-native';
import TeamHeader from '@components/Team/TeamHeader';
import useCurrentRoute from '@hooks/useCurrentRoute';
import PostItem from '@components/common/PostItem';
import HorizontalCalendar from '@components/Team/HorizontalCalendar';

interface Props {
  paramName: string;
}

const TeamScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  console.log('route:', route.params.id);

  return (
    <>
      <View className="pt-[66px]">
        <HorizontalCalendar />
      </View>
      {/* <View className="flex-1 bg-black100">
        <FlatList
          data={[...Array(20)]}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => <PostItem key={index} />}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-[18px]" />}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 30, paddingHorizontal: 16 }}
        />
      </View> */}

      <TeamHeader title="아줌마들의 우정은 디질때까지" />
    </>
  );
};

export default TeamScreen;
