import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Team } from '@clientTypes/team';
import { cn } from '@utils/cn';

interface Props extends Team {
  isSharing: boolean;
  toggleSharing: (id: number) => void;
}

const SelectTeamItem = (props: Props) => {
  const { id, title, photoUrls, isSharing, toggleSharing } = props;

  return (
    <View className="h-[94px] rounded-2xl bg-black100 w-full flex flex-row justify-between items-center p-4 border-[1px] border-black200">
      <View className="space-y-3">
        <View className="flex flex-row">
          {photoUrls.slice(0, 5).map((uri, idx) => (
            <View
              key={idx}
              className={cn(idx === 0 ? 'ml-0' : 'ml-[-12px]', 'w-[36px] h-[36px] border-[1px] border-black200 rounded-xl overflow-hidden')}>
              <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
            </View>
          ))}
        </View>
        <Text className="text-black900 text-sm font-PTDLight">{title}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleSharing(id)}
        className={cn(
          isSharing ? 'bg-white border-[1px] border-black200' : 'bg-black900',
          'h-9 w-[74px] flex justify-center items-center rounded-xl',
        )}>
        <Text className={cn(isSharing ? 'text-black900' : 'text-white', 'text-sm font-PTDSemiBold')}>{isSharing ? '공유중' : '공유하기'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTeamItem;
