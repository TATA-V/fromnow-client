import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '@assets/icons/LeftArrowIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import moment from 'moment-modification-rn';

interface Props {
  close: () => void;
}

const TeamSettingHeader = ({ close }: Props) => {
  const insets = useSafeAreaInsets();
  const { title, createdAt } = useSelectedTeamStore(state => state);
  const startDate = moment(createdAt);
  const currentDate = moment();
  const daysShared = currentDate.diff(startDate, 'days') + 1;

  return (
    <View style={{ top: insets.top }} className="absolute px-[8px] h-[66px] w-full flex flex-row items-center justify-between bg-white">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={close} className="w-[44px] h-[44px] p-[10px]">
          <LeftArrowIcon />
        </TouchableOpacity>
        <View className="space-y-[5px]">
          <Text ellipsizeMode="tail" className="text-black900 text-sm font-PTDSemiBold ml-[4px]">
            {title}
          </Text>
          <Text className="text-black500 text-[12px] font-PTDLight ml-[4px]">{daysShared}일째 일상을 공유하고 있어요 :)</Text>
        </View>
      </View>
    </View>
  );
};

export default TeamSettingHeader;
