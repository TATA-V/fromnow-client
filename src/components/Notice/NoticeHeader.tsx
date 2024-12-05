import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import { removeStorage } from '@utils/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  title: string;
  resetNoticeList: () => void;
}

const NoticeHeader = ({ title, resetNoticeList }: Props) => {
  const insets = useSafeAreaInsets();
  const { navigation } = useNavi();

  const deleteAll = async () => {
    resetNoticeList();
    await removeStorage('notice');
  };

  return (
    <View style={{ top: insets.top }} className="absolute px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <View className="w-[69px] h-[48px] justify-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-[44px] h-[44px] p-[10px]">
          <LeftArrowIcon />
        </TouchableOpacity>
      </View>
      <Text className="text-black900 text-base font-PTDSemiBold">{title}</Text>
      <TouchableOpacity onPress={deleteAll} className="w-[69px] h-[48px] justify-center items-center">
        <Text className="text-black700 text-[12px] font-PTDLight">모두 읽음</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoticeHeader;
