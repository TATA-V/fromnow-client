import React, { useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import TeamItem from '@components/MyTeam/TeamItem';
import { useGetAllMyTeamRequest } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';

const { width } = Dimensions.get('window');

const MyTeamRequestScreen = () => {
  const [isAllTeam, setIsAllTeam] = useState(true);
  const { data, isLoading } = useGetAllMyTeamRequest();

  if (isLoading)
    return (
      <View className="flex-1 bg-[#FBFBFD]">
        <MiniLoading />
      </View>
    );

  return (
    <View className="flex-1 bg-black100">
      {data.length > 0 && (
        <ScrollView className="px-4 pt-[4px]" contentContainerStyle={{ paddingBottom: 30 }}>
          <View className="bg-white rounded-2xl border-[1px] border-black200 overflow-hidden">
            {[...Array(20)].map((_, idx) => (
              <TeamItem key={idx} isTeam={isAllTeam} />
            ))}
          </View>
        </ScrollView>
      )}
      {data.length === 0 && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full justify-center items-center transfrom translate-y-[-66px]" pointerEvents="box-none">
            <AvatarSadMsg message={`이런! 아직 받은\n모임 요청이 없어요`} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyTeamRequestScreen;

const styles = StyleSheet.create({
  button: {
    width: (width - 48 - 12) / 2,
  },
});
