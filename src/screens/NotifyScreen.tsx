import React from 'react';
import NotifyItem from '@components/Notify/NotifyItem';
import { FlashList } from '@shopify/flash-list';

const NotifyScreen = () => {
  return (
    <FlashList
      data={[...Array(20)]}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item, index }) => <NotifyItem key={index} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30, paddingHorizontal: 16 }}
      initialScrollIndex={0}
      estimatedItemSize={60}
      estimatedFirstItemOffset={0}
    />
  );
};

export default NotifyScreen;
