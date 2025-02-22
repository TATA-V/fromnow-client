import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MyTeamRequest } from '@clientTypes/user';
import PlusIcon from '@assets/icons/PlusIcon';
import { useAcceptTeam } from '@hooks/query';
import { useDebounce } from '@hooks/useOptimization';
import { cn } from '@utils/cn';

const TeamItem = (props: MyTeamRequest) => {
  const { diaryId, diaryTitle, photoUrls } = props;

  const { acceptTeamMutation } = useAcceptTeam();
  const addTeam = useDebounce(() => {
    acceptTeamMutation.mutate(diaryId);
  }, 500);

  return (
    <View className="h-[94px] rounded-2xl bg-white w-full flex flex-row justify-between items-center p-4">
      <View className="space-y-3">
        <View className="flex flex-row">
          {photoUrls.slice(0, 8).map((url, idx) => (
            <View
              key={idx}
              className={cn(idx === 0 ? 'ml-0' : 'ml-[-12px]', 'w-[36px] h-[36px] border-[1px] border-black200 rounded-xl overflow-hidden')}>
              {url && <Image source={{ uri: url }} className="w-full h-full" resizeMode="cover" />}
            </View>
          ))}
          {photoUrls.length > 8 && (
            <View className="w-[36px] h-[36px] ml-[-12px] rounded-[12px] border-[1px] border-black200 flex flex-row bg-black100 justify-center items-center">
              <PlusIcon size={13.5} color="#B3B4B9" />
              <Text className="text-black500 font-PTDLight text-[15px]">{photoUrls.length - 8}</Text>
            </View>
          )}
        </View>
        <Text className="text-black900 text-sm font-PTDLight">{diaryTitle}</Text>
      </View>
      <TouchableOpacity onPress={addTeam} className="bg-black900 h-9 w-[74px] flex justify-center items-center rounded-xl">
        <Text className="text-sm font-PTDSemiBold text-white">모임추가</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamItem;
