import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import useToast from '@hooks/useToast';
import { getStorage, setStorage } from '@utils/storage';
import { useGetSearchFriend } from '@hooks/query';
import RecentSearches from '@components/Search/RecentSearches';
import SearchHeader from '@components/Search/SearchHeader';
import SearchNotFound from '@components/Search/SearchNotFound';
import SearchResultList from '@components/Search/SearchResultList';
import MiniLoading from '@components/common/MiniLoading';
import DismissKeyboard from '@components/common/DismissKeyboard';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [submitSearch, setSubmitSearch] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const { warnToast } = useToast();

  const { data, isLoading } = useGetSearchFriend(submitSearch.trim(), { enabled: hasSearched });

  const startSearch = () => {
    if (hasSearched) return;
    setHasSearched(true);
  };

  const saveHistory = async (newSearch: string) => {
    const isAutoSave = await getStorage('isAutoSave');
    if (!isAutoSave || isAutoSave === 'false') return;

    let histStorage: string[] = JSON.parse(await getStorage('searchHistory')) || [];
    if (!Array.isArray(history)) {
      histStorage = [];
    }
    if (!histStorage.includes(newSearch.toLowerCase().trim())) {
      histStorage.unshift(newSearch.trim());
      setHistory([newSearch, ...history].slice(0, 17));
      const updateHistory = histStorage.length > 17 ? histStorage.slice(0, 17) : histStorage;
      await setStorage('searchHistory', JSON.stringify(updateHistory));
    } else {
      histStorage = histStorage.filter(item => item.toLowerCase() !== newSearch.toLowerCase());
      histStorage.unshift(newSearch);
      await setStorage('searchHistory', JSON.stringify(histStorage));
    }
  };

  // 검색 제출
  const onSubmitEditing = async () => {
    if (search.trim().length === 0) return warnToast('검색어를 입력해 주세요.');
    startSearch();
    setSubmitSearch(search);
    await saveHistory(search);
  };

  const recentSearchClick = async (title: string) => {
    startSearch();
    setSubmitSearch(title);
    setSearch(title);
    await saveHistory(title);
  };

  useEffect(() => {
    console.log('hasSearched:', hasSearched);
  }, [hasSearched]);

  const searchHeaderProps = { hasSearched, search, setSearch, onSubmitEditing };
  if (isLoading)
    return (
      <>
        <SearchHeader {...searchHeaderProps} />
        <View className="pt-[66px]">
          <MiniLoading />
        </View>
      </>
    );

  return (
    <DismissKeyboard>
      <View className="flex-1">
        <View className="pt-[66px] px-4">
          {!hasSearched && <RecentSearches recentSearchClick={recentSearchClick} history={history} setHistory={setHistory} />}
          {hasSearched && data && data.length !== 0 && <SearchResultList searchList={data} search={submitSearch.trim()} />}
          {hasSearched && !data?.length && <SearchNotFound />}
        </View>
        <SearchHeader {...searchHeaderProps} />
      </View>
    </DismissKeyboard>
  );
};

export default SearchScreen;
