import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HistoryChip from '@components/Search/HistoryChip';
import { getStorage, removeStorage, setStorage } from '@utils/storage';

interface Props {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
}

const RecentSearches = ({ history, setHistory }: Props) => {
  const [autoSave, setAutoSave] = useState<boolean>(true);

  useEffect(() => {
    const getSorages = async () => {
      const isAutoSaveString = await getStorage('isAutoSave');
      let searchHistory = JSON.parse(await getStorage('searchHistory')) || [];
      setAutoSave(isAutoSaveString === 'true');
      setHistory(searchHistory);
    };

    getSorages();
  }, []);

  const toggleAutoSave = async () => {
    const newStatus = !autoSave;
    await setStorage('isAutoSave', JSON.stringify(newStatus));
    setAutoSave(!autoSave);
    if (!autoSave) return;
    setHistory([]);
    await removeStorage('searchHistory');
  };

  const removeAll = async () => {
    await removeStorage('searchHistory');
    setHistory([]);
  };

  const removeOne = async (title: string) => {
    const update = history.filter(item => item !== title);
    await setStorage('searchHistory', JSON.stringify(update));
    setHistory(update);
  };

  return (
    <View className="px-4 w-full py-4 pr-4 pl-[9px]  my-[4px] rounded-2xl bg-white border-[1px] border-black200">
      <View className="w-full flex pl-[7px] flex-row justify-between pb-[13px]">
        <Text className="text-black700 font-PTDSemiBold text-base">최근 검색</Text>
        <View className="flex flex-row">
          <TouchableOpacity onPress={removeAll}>
            <Text className="text-black500 text-sm font-PTDRegular">전체삭제</Text>
          </TouchableOpacity>
          <Text className="text-sm text-black200 mx-[8px]">|</Text>
          <TouchableOpacity onPress={toggleAutoSave}>
            <Text className="text-black500 text-sm font-PTDRegular">{autoSave ? '자동저장 끄기' : '자동저장 켜기'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-row flex-wrap">
        {history.map((title, idx) => (
          <HistoryChip key={idx} title={title} removeOne={removeOne} />
        ))}
        {history.length === 0 && (
          <View className="py-4 w-full items-center">
            <Text className="text-[#cbcdd3] font-PTDMedium">최근 검색이 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RecentSearches;
