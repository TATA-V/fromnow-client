import React, { useEffect, useState } from 'react';
import NoticeItem from '@components/Notify/NoticeItem';
import { FlashList } from '@shopify/flash-list';
import { Swipeable } from 'react-native-gesture-handler';
import DeleteButton from '@components/common/SwipeableAction';
import { Notice } from '@utils/clientNoti';
import { getStorage, setStorage } from '@utils/storage';
import NoticeHeader from '@components/Notify/NoticeHeader';
import { View } from 'react-native';
import AvatarSadMsg from '@components/common/AvatarSadMsg';

const NoticeScreen = () => {
  const [noticeList, setNoticeList] = useState<Notice[]>([]);

  useEffect(() => {
    const getNoticeList = async () => {
      let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
      setNoticeList(noticeStorage);
    };
    getNoticeList();
  }, []);

  const deleteNoti = async (id: string | number) => {
    let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
    noticeStorage = noticeStorage.filter(item => item.id !== id);
    setNoticeList(noticeStorage);
    await setStorage('notice', JSON.stringify(noticeStorage));
  };
  const resetNoticeList = () => setNoticeList([]);

  return (
    <>
      {noticeList.length > 0 && (
        <FlashList
          data={noticeList}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item, index }) => (
            <Swipeable key={index} renderRightActions={() => <DeleteButton id={index} onDelete={() => deleteNoti(item.id)} />}>
              <NoticeItem {...item} setNoticeList={setNoticeList} />
            </Swipeable>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 66, paddingBottom: 30 }}
          initialScrollIndex={0}
          estimatedItemSize={60}
          estimatedFirstItemOffset={0}
        />
      )}
      {noticeList.length === 0 && (
        <View className="h-full justify-center transform translate-y-[-66px]">
          <AvatarSadMsg message={`최근 알림이 없습니다.`} />
        </View>
      )}
      <NoticeHeader title="알림" resetNoticeList={resetNoticeList} />
    </>
  );
};

export default NoticeScreen;
