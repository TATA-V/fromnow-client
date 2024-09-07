import React from 'react';
import { FlatList } from 'react-native';
import NotifyItem from '@components/Notify/NotifyItem';

const NotifyScreen = () => {
  return (
    <FlatList
      data={[...Array(20)]}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item, index }) => <NotifyItem key={index} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 16 }}
    />
  );
};

export default NotifyScreen;
