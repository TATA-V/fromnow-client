import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActionSheet, { FlatList } from 'react-native-actions-sheet';
import { useGetAllTeam, usePostOneBoard } from '@hooks/query';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { Team } from '@clientTypes/team';
import { useDebounce } from '@hooks/useOptimization';
import { isIOS } from '@utils/deviceInfo';

import GrayLoadingLottie from '@components/Lottie/GrayLoadingLottie';
import SelectTeamItem from '@components/BoardEdit/SelectTeamItem';
import MiniLoading from '@components/common/MiniLoading';
import Button from '@components/common/Button';

interface Props {
  payload?: {
    file: ImageType;
    content: string;
  };
}

const SelectTeam = ({ payload }: Props) => {
  const [teams, setTeams] = useState<(Team & { isSharing: boolean })[]>([]);
  const { data, isLoading } = useGetAllTeam();
  const { createBoardMutation } = usePostOneBoard();

  useEffect(() => {
    if (!data) return;
    const updateTeams = data.map((item: Team) => ({ ...item, isSharing: false }));
    setTeams(updateTeams);
  }, [data]);

  const toggleSharing = (id: number) => {
    setTeams(prev => prev.map(team => (team.id === id ? { ...team, isSharing: !team.isSharing } : team)));
  };

  const confirmTeamSelection = () => {
    const diaryIds = teams.reduce((acc, team) => {
      if (team.isSharing) {
        acc.push(team.id);
      }
      return acc;
    }, []);
    const chooseDiaryDto = { content: payload.content, diaryIds };
    createBoardMutation.mutate({ uploadPhotos: payload.file, chooseDiaryDto });
  };
  const debounceConfirmTeamSelection = useDebounce(confirmTeamSelection, 500);

  if (isLoading) return <MiniLoading />;

  return (
    <ActionSheet gestureEnabled={true} indicatorStyle={{ display: 'none' }} containerStyle={styles.container}>
      <View className="relative h-full justify-between">
        <View className="h-[582px]">
          <View className="h-[22px] justify-center items-center">
            <View className="p-[5px]">
              <View className="bg-[#D7D7D7] w-[40px] h-[3.5px] rounded-[10.49px]" />
            </View>
          </View>
          <View className="h-[66px] justify-center items-center">
            <Text className="text-black900 text-base font-PTDSemiBold">공유 모임 선택</Text>
          </View>
          <FlatList
            data={teams}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => <SelectTeamItem key={index} {...item} toggleSharing={toggleSharing} />}
            ItemSeparatorComponent={() => <View className="h-[10px]" />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
            ListFooterComponent={() => <View className="h-[120px]" />}
          />
        </View>
        <View className="absolute bottom-0 pb-[20px] pt-4 w-full bg-white">
          <Button disabled={createBoardMutation.isPending || teams.length === 0} onPress={debounceConfirmTeamSelection}>
            {createBoardMutation.isPending ? (
              <GrayLoadingLottie customStyle={{ width: 100, height: 48, transform: isIOS ? undefined : 'translateY(12px)' }} />
            ) : (
              '다음'
            )}
          </Button>
        </View>
      </View>
    </ActionSheet>
  );
};

export default SelectTeam;

const styles = StyleSheet.create({
  container: {
    height: 582,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
});
