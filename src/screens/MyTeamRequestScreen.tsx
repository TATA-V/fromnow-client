import React from 'react';
import { ScrollView, View, Dimensions, StyleSheet, RefreshControl } from 'react-native';
import TeamItem from '@components/MyTeam/TeamItem';
import { QUERY_KEY, useGetAllMyTeamRequest, useKey } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useRefresh from '@hooks/useRefresh';

const { width } = Dimensions.get('window');

const MyTeamRequestScreen = () => {
  const { data, isLoading } = useGetAllMyTeamRequest();
  const myTeamReqKey = useKey([QUERY_KEY.MY, 'team', 'request']);
  const { refreshing, onRefresh } = useRefresh({ queryKey: myTeamReqKey });

  if (isLoading)
    return (
      <View className="flex-1 bg-[#FBFBFD]">
        <MiniLoading />
      </View>
    );

  return (
    <View className="flex-1 bg-black100">
      {data.length > 0 && (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          className="px-4 pt-[4px]"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-2xl border-[1px] border-black200 overflow-hidden">
            {data.map((item, idx) => (
              <TeamItem key={idx} {...item} />
            ))}
          </View>
        </ScrollView>
      )}
      {data.length === 0 && (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ flexGrow: 1 }}>
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
