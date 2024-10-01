import React, { Dispatch, SetStateAction } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Logo from '@assets/icons/logo.svg';
import SearchIcon from '@assets/icons/SearchIcon';
import PenIcon from '@assets/icons/PenIcon';
import BellIcon from '@assets/icons/bell.svg';
import CheckIcon from '@assets/icons/check.svg';
import useNavi from '@hooks/useNavi';

interface Props {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

const HomeHeader = ({ isEdit, setIsEdit }: Props) => {
  const { navigation } = useNavi();

  return (
    <View className="bg-black100 h-[66px] w-full flex flex-row px-[8px] items-center justify-between z-10">
      <View className="px-[10px] w-[112px] h-38px">
        <View className="w-[92px] h-[18px]">
          <Logo />
        </View>
      </View>
      <View className="h-[48px] flex flex-row px-3 space-x-[12px] items-center">
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <SearchIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notify')}>
          <BellIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsEdit(!isEdit)}>{isEdit ? <CheckIcon /> : <PenIcon size={24} color="#1C1C1E" />}</TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
