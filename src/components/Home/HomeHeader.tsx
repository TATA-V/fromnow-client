import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Logo from '@assets/icons/logo.svg';
import SearchIcon from '@assets/icons/search.svg';
import BellIcon from '@assets/icons/bell.svg';
import useNavi from '@hooks/useNavi';

const HomeHeader = () => {
  const { navigation } = useNavi();

  return (
    <View className="bg-black100 h-[66px] w-full flex flex-row px-[8px] items-center justify-between">
      <View className="px-[10px] w-[112px] h-38px">
        <View className="w-[92px] h-[18px]">
          <Logo />
        </View>
      </View>
      <View className="w-[84px] h-[48px] flex flex-row justify-between px-3 items-center">
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <SearchIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notify')}>
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
