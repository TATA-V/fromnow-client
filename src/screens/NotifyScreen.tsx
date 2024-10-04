import React from 'react';
import NotifyItem from '@components/Notify/NotifyItem';
import { FlashList } from '@shopify/flash-list';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteButton from '@components/common/SwipeableAction';

const NotifyScreen = () => {
  const deleteNoti = (id: number) => {
    console.log(id);
  };

  return (
    <FlashList
      data={[...Array(20)]}
      keyExtractor={(_, idx) => idx.toString()}
      renderItem={({ item, index }) => (
        <Swipeable key={index} renderRightActions={() => <DeleteButton id={index} onDelete={deleteNoti} />}>
          <NotifyItem />
        </Swipeable>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
      initialScrollIndex={0}
      estimatedItemSize={60}
      estimatedFirstItemOffset={0}
    />
  );
};

export default NotifyScreen;
