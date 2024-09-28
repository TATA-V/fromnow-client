import React from 'react';
import { ScrollView, View } from 'react-native';
import FriendItem from '@components/common/FriendItem';
import { SearchFriend } from '@clientTypes/friend';

interface Props {
  searchList: SearchFriend[];
}

const SearchResultList = ({ searchList }: Props) => {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 25 }} showsVerticalScrollIndicator={false}>
      <View className="border-[1px] border-black200 bg-white rounded-2xl my-[4px]">
        {searchList.map((data, idx) => (
          <FriendItem key={idx} {...data} />
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchResultList;
