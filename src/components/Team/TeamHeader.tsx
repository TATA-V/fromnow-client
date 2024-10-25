import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import useNavi from '@hooks/useNavi';
import CalendarIcon from '@assets/icons/calendar.svg';
import MenuIcon from '@assets/icons/menu.svg';
import GalleryIcon from '@assets/icons/gallery.svg';
import useCurrentRoute from '@hooks/useCurrentRoute';
import TeamSettingDrawer from '@components/TeamSetting/TeamSettingDrawer';
import useSelectedTeamStore from '@store/useSelectedTeamStore';

const TeamHeader = () => {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const [openSetting, setOpenSetting] = useState(false);
  const { title } = useSelectedTeamStore();

  const navigateToScreen = (target: string) => {
    navigation.navigate(target, { id: route.params.id });
  };

  const goBack = () => {
    if (route.name === 'Team') {
      navigation.navigate('Home');
      return;
    }
    navigation.goBack();
  };

  return (
    <>
      <View className="px-[8px] bg-white h-[66px] w-full flex flex-row items-center justify-between">
        <View className="flex flex-row items-center">
          <TouchableOpacity onPress={goBack} className="w-[44px] h-[44px] p-[10px]">
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
          <TouchableOpacity onPress={() => setOpenSetting(true)}>
            <MenuIcon />
          </TouchableOpacity>
        </View>
      </View>
      <TeamSettingDrawer open={openSetting} setOpen={setOpenSetting} />
    </>
  );
};

export default TeamHeader;
