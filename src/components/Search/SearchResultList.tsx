import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import FriendItem from '@components/common/FriendItem';
import { QUERY_KEY, useKey } from '@hooks/query';
import useRefresh from '@hooks/useRefresh';
import { Friend } from '@clientTypes/friend';

interface Props {
  search: string;
  searchList: Friend[];
}

const SearchResultList = ({ search, searchList }: Props) => {
  const searchKey = useKey(['search', QUERY_KEY.FRIEND, search]);
  const { refreshing, onRefresh } = useRefresh({ queryKey: searchKey });

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingBottom: 25 }}
      showsVerticalScrollIndicator={false}>
      <View className="border-[1px] border-black200 bg-white rounded-2xl my-[4px]">
        {searchList.map((data, idx) => (
          <FriendItem key={idx} {...data} isFriendReq />
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchResultList;
