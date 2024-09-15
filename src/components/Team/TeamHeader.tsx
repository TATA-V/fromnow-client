import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarIcon from '@assets/icons/calendar.svg';
import MenuIcon from '@assets/icons/menu.svg';
import GalleryIcon from '@assets/icons/gallery.svg';
import useCurrentRoute from '@hooks/useCurrentRoute';

interface Props {
  title: string;
}

const TeamHeader = ({ title }: Props) => {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const insets = useSafeAreaInsets();

  const navigateToScreen = (target: string) => {
    navigation.navigate(target, { id: route.params.id });
  };

  return (
    <View style={{ top: insets.top }} className="absolute px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="w-[44px] h-[44px] p-[10px]">
          <LeftArrowIcon />
        </TouchableOpacity>
        <Text className="text-black900 text-base font-PTDSemiBold ml-[4px]">{title}</Text>
      </View>
      <View className="w-[84px] h-[48px] px-3 flex flex-row justify-between items-center">
        {route.name === 'Team' ? (
          <TouchableOpacity onPress={() => navigateToScreen('TeamCalendar')}>
            <CalendarIcon />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigateToScreen('Team')}>
            <GalleryIcon />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigateToScreen('TeamSetting')}>
          <MenuIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeamHeader;
