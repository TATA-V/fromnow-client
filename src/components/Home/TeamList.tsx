import React from 'react';
import { FlatList, View } from 'react-native';
import PlusIcon from '@assets/icons/PlusIcon';
import TeamFolder, { Color } from '@components/common/TeamFolder';
import Button from '@components/common/Button';
import { Team } from '@clientTypes/team';
import useNavi from '@hooks/useNavi';
import FadeIn from '@components/common/FadeIn';
import useDeviceSize from '@hooks/useDeviceSize';

interface Props {
  teamList: Team[];
  colors: Color[];
}

function TeamList({ teamList, colors }: Props) {
  const { navigation } = useNavi();
  const { isTablet } = useDeviceSize();
  const numColumns = isTablet ? 4 : 2;
  const centerList = isTablet ? teamList.length < 4 : teamList.length !== 1;

  return (
    <View className={`${centerList && 'items-center'} flex w-full flex-1`}>
      <FlatList
        key={numColumns}
        data={teamList}
        keyExtractor={team => team.id.toString()}
        renderItem={({ item, index }) => (
          <View className={`${(index + 1) % numColumns === 0 || teamList.length === 1 ? 'mr-0' : 'mr-[18px]'}`}>
            <FadeIn>
              <TeamFolder {...item} color={colors[index % colors.length]} />
            </FadeIn>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 18, height: 18 }} />}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 16,
          paddingBottom: 6,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <FadeIn>
            <View className="mb-[25px] w-full items-center pt-[18px] pb-[130px]">
              <Button onPress={() => navigation.navigate('TeamCreate')} size="mid" color="white" icon={<PlusIcon color="#1C1C1E" />}>
                모임 생성하기
              </Button>
            </View>
          </FadeIn>
        }
        numColumns={numColumns}
        initialScrollIndex={teamList.length > 0 ? 0 : undefined}
        horizontal={false}
      />
    </View>
  );
}

export default TeamList;
