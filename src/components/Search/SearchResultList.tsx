import React from 'react';
import { ScrollView, View } from 'react-native';
import FriendItem from '@components/common/FriendItem';

const SearchResultList = () => {
  return (
    <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 25 }}>
      <View className="border-[1px] border-black200 bg-white rounded-2xl my-[4px]">
        {[...Array(20)].map((_, idx) => (
          <FriendItem key={idx} isFriend />
        ))}
      </View>
    </ScrollView>
  );
};

export default SearchResultList;
