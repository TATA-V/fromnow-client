import React, { useState } from 'react';
import { View } from 'react-native';
import RecentSearches from '@components/Search/RecentSearches';
import SearchHeader from '@components/Search/SearchHeader';
import SearchNotFound from '@components/Search/SearchNotFound';
import SearchResultList from '@components/Search/SearchResultList';
import { getStorage, setStorage } from '@utils/storage';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const startSearch = () => {
    if (hasSearched) return;
    setHasSearched(true);
  };

  // 검색 제출
  const onSubmitEditing = async () => {
    startSearch();
    const isAutoSave = await getStorage('isAutoSave');
    if (!isAutoSave || isAutoSave === 'false') {
      return;
    }

    let histStorage: string[] = JSON.parse(await getStorage('searchHistory')) || [];
    if (!Array.isArray(history)) {
      histStorage = [];
    }
    if (!histStorage.includes(search.trim())) {
      histStorage.unshift(search.trim());
      setHistory([search, ...history].slice(0, 10));
      const updateHistory = histStorage.length > 10 ? histStorage.slice(0, 10) : histStorage;
      await setStorage('searchHistory', JSON.stringify(updateHistory));
    }
  };

  return (
    <>
      <View className="pt-[66px]">
        {/* {!hasSearched && <RecentSearches history={history} setHistory={setHistory} />} */}
        {/* 검색 결과가 있으면 */}
        {hasSearched && <SearchResultList />}
        {/* 검색 결과가 없으면 */}
        {/* {hasSearched && <SearchNotFound />} */}
        <SearchNotFound />
      </View>
      <SearchHeader search={search} setSearch={setSearch} onSubmitEditing={onSubmitEditing} />
    </>
  );
};

export default SearchScreen;
