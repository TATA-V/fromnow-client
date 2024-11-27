import React, { Dispatch, SetStateAction } from 'react';
import { View, Pressable } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from '@hooks/useOptimization';

import Input from '@components/common/Input';

interface Props {
  hasSearched: boolean;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  onSubmitEditing: () => void;
}

const SearchHeader = ({ hasSearched, search, setSearch, onSubmitEditing }: Props) => {
  const { navigation } = useNavi();
  const insets = useSafeAreaInsets();

  const goBack = () => {
    navigation.goBack();
  };
  const debounceOnSubmitEditing = useDebounce(onSubmitEditing, 500);

  return (
    <View style={{ top: insets.top }} className="absolute pl-[48px] pr-[16px] bg-black100 h-[66px] w-full flex flex-row items-center justify-between">
      <View className="absolute top-0 h-full justify-center left-[9px]">
        <Pressable onPress={goBack} className="w-[32px] h-[44px] px-[8px] flex flex-row justify-start items-center mr-[8px]">
          <LeftArrowIcon />
        </Pressable>
      </View>
      <View className="w-full">
        <Input
          onSubmitEditing={debounceOnSubmitEditing}
          value={search}
          setValue={setSearch}
          placeholder="친구 별명 등 검색어를 입력해 주세요"
          search
          autoFocus={hasSearched ? false : true}
        />
      </View>
    </View>
  );
};

export default SearchHeader;
