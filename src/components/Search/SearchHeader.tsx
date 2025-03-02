import React, { Dispatch, SetStateAction } from 'react';
import { View, Pressable } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDebounce } from '@hooks/useOptimization';
import { isAndroid } from '@utils/deviceInfo';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const goBack = () => {
    navigation.goBack();
  };
  const debounceOnSubmitEditing = useDebounce(onSubmitEditing, 500);

  return (
    <View
      style={{ top: isAndroid ? insets.top : 0 }}
      className="absolute pl-[48px] pr-[16px] bg-black100 h-[66px] w-full flex flex-row items-center justify-between">
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
          placeholder={t('header.search.placeholder')}
          search
          autoFocus={hasSearched ? false : true}
        />
      </View>
    </View>
  );
};

export default SearchHeader;
