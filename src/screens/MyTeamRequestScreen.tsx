import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import TeamItem from '@components/MyTeam/TeamItem';
import { QUERY_KEY, useGetAllMyTeamRequest, useKey, usePostTeamReject } from '@hooks/query';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import useRefresh from '@hooks/useRefresh';
import DeleteButton from '@components/common/DeleteButton';
import { Swipeable } from 'react-native-gesture-handler';
import FullScreenMiniLoading from '@components/common/FullScreenMiniLoading';
import { useDebounce } from '@hooks/useOptimization';

const MyTeamRequestScreen = () => {
  const { data, isLoading } = useGetAllMyTeamRequest();
  const myTeamReqKey = useKey([QUERY_KEY.MY, 'team', 'request']);
  const { refreshing, onRefresh } = useRefresh({ queryKey: myTeamReqKey });
  const { friendRequestMutation } = usePostTeamReject();

  const deleteTeamReq = useDebounce((diaryId: number) => {
    friendRequestMutation.mutate(diaryId);
  }, 500);

  if (isLoading) return <FullScreenMiniLoading />;

  return (
    <View className="flex-1 bg-black100">
      {data.length > 0 && (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          className="px-4 pt-[4px]"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-2xl border-[1px] border-black200 overflow-hidden">
            {data.map(item => (
              <Swipeable key={item.diaryId} renderRightActions={() => <DeleteButton id={item.diaryId} onDelete={deleteTeamReq} />}>
                <TeamItem {...item} />
              </Swipeable>
            ))}
          </View>
        </ScrollView>
      )}
      {data.length === 0 && (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full h-full justify-center items-center transfrom translate-y-[-66px]" pointerEvents="box-none">
            <AvatarSadMsg message={`아직 받은\n모임 요청이 없어요`} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyTeamRequestScreen;
