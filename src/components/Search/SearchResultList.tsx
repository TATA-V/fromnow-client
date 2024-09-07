import React from 'react';
import { ScrollView, View } from 'react-native';
import FriendItem from '@components/common/FriendItem';

const SearchResultList = () => {
  return (
    <ScrollView className="px-4">
      <View className="border-[1px] border-black200 bg-white rounded-2xl my-[4px]">
        <FriendItem isFriend={false} />
        <FriendItem isFriend={true} />
        <FriendItem isFriend={false} />
        <FriendItem isFriend={true} />
      </View>
    </ScrollView>
  );
};

export default SearchResultList;
