import React from 'react';
import PlusIcon from '@assets/icons/PlusIcon';
import useNavi from '@hooks/useNavi';
import TeamFolder, { Color } from '@components/common/TeamFolder';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DndProvider, Draggable, DraggableGrid, DraggableGridProps } from '@mgcrea/react-native-dnd';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import Button from '@components/common/Button';
import FadeIn from '@components/common/FadeIn';
import { Team } from '@clientTypes/team';
import { useTranslation } from 'react-i18next';

interface Props {
  teamList: Team[];
  colors: Color[];
}

function DndTeamList({ teamList, colors }: Props) {
  const { navigation } = useNavi();
  const { t } = useTranslation();
  const GRID_SIZE = 2;

  const onGridOrderChange: DraggableGridProps['onOrderChange'] = orderedIds => {
    // const updateTeamList = orderedIds.map(id => teamList.find(team => team.id === Number(id)));
    // console.log('updateTeamList', updateTeamList);
    // console.log('orderedIds', orderedIds);
  };

  const randomRotate = [
    { from: '-2.5deg', to: '2.5deg' },
    { from: '2.5deg', to: '-2.5deg' },
  ];
  const getRandomRotation = () => {
    const randomIndex = Math.floor(Math.random() * randomRotate.length);
    return randomRotate[randomIndex];
  };

  return (
    <ScrollView
      className="flex-1 bg-black100"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 150 }}>
      <View className="flex w-full items-center flex-1 pt-4">
        <DndProvider>
          <DraggableGrid gap={16} direction="row" size={GRID_SIZE} onOrderChange={onGridOrderChange} style={styles.grid}>
            {teamList.map((item, idx) => {
              const { from, to } = getRandomRotation();

              return (
                <Draggable key={item.id} id={item.id.toString()} data={item}>
                  <MotiView
                    from={{ rotate: from }}
                    animate={{ rotate: to }}
                    transition={{
                      type: 'timing',
                      duration: 100,
                      easing: Easing.inOut(Easing.ease),
                      loop: true,
                      repeatReverse: true,
                    }}>
                    <FadeIn>
                      <TeamFolder {...item} color={colors[idx % colors.length]} />
                    </FadeIn>
                  </MotiView>
                </Draggable>
              );
            })}
          </DraggableGrid>
        </DndProvider>
        <View className="w-full items-center pt-[18px]">
          <FadeIn>
            <Button onPress={() => navigation.navigate('TeamCreate')} size="mid" color="white" icon={<PlusIcon color="#1C1C1E" />}>
              {t('teamCreate.create')}
            </Button>
          </FadeIn>
        </View>
      </View>
    </ScrollView>
  );
}

export default DndTeamList;

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
});
