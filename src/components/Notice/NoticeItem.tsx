import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, Image } from 'react-native';
import thumbnailPng from '@assets/png/thumbnail.png';
import { Notice } from '@utils/clientNoti';
import { navigateByPath } from '@utils/pathHandler';
import { getStorage, setStorage } from '@utils/storage';

interface Props extends Notice {
  setNoticeList: Dispatch<SetStateAction<Notice[]>>;
}

const NoticeItem = (props: Props) => {
  const { id, imgUrl, path, content, setNoticeList } = props;

  const clickNotice = async () => {
    let noticeStorage: Notice[] = JSON.parse(await getStorage('notice')) || [];
    noticeStorage = noticeStorage.filter(item => item.id !== id);
    await setStorage('notice', JSON.stringify(noticeStorage));
    setNoticeList(noticeStorage);

    navigateByPath(path);
  };

  return (
    <View onTouchEnd={clickNotice} className="px-4 h-[60px] flex flex-row items-center space-x-[8px] bg-white">
      <View className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200">
        <Image source={imgUrl ? { uri: imgUrl } : thumbnailPng} className="w-full h-full rounded-xl" resizeMode="cover" />
      </View>
      <Text className="text-black900 font-PTDLight text-sm">{content}</Text>
    </View>
  );
};

export default NoticeItem;
