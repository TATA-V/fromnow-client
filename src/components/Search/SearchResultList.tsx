import React from 'react';
import { View } from 'react-native';
import FriendItem from '@components/common/FriendItem';

const SearchResultList = () => {
  return (
    <View className="border-[1px] border-black200 bg-white rounded-2xl my-[4px]">
      <FriendItem isFriend={false} />
      <FriendItem isFriend={true} />
      <FriendItem isFriend={false} />
      <FriendItem isFriend={true} />
    </View>
  );
};

export default SearchResultList;
