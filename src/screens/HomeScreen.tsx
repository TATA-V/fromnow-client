import React, { useState } from 'react';
import { ScrollView, ImageSourcePropType, StyleSheet, View, Animated, PanResponder } from 'react-native';
import { DndProvider, Draggable, DraggableGrid, DraggableGridProps } from '@mgcrea/react-native-dnd';
import HomeHeader from '@components/Home/HomeHeader';
import PlusIcon from '@assets/icons/PlusIcon';
import profilePng from '@assets/png/profile.png';
import Button from '@components/common/Button';
import TeamFolder, { Color } from '@components/common/TeamFolder';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';
import TeamNotFound from '@components/Home/TeamNotFound';
import FadeIn from '@components/common/FadeIn';

export interface Team {
  id: number;
  title: string;
  users: string[] | ImageSourcePropType[];
}

const HomeScreen = () => {
  const [teamList, setTeamList] = useState<Team[]>([
    { id: 1, title: '아줌마들의 우정을 디질때까지', users: [profilePng, profilePng] },
    { id: 2, title: '무한도전 재밌어요', users: [profilePng, profilePng] },
    { id: 3, title: '냥대 뉴진스ㅋ', users: [profilePng, profilePng] },
    { id: 4, title: '회사 가기 싫잔아요', users: [profilePng, profilePng] },
    //
    { id: 5, title: '아줌마들의 우정을 디질때까지', users: [profilePng, profilePng] },
    { id: 6, title: '무한도전 재밌어요', users: [profilePng, profilePng] },
    { id: 7, title: '냥대 뉴진스ㅋ', users: [profilePng, profilePng] },
    { id: 8, title: '회사 가기 싫잔아요', users: [profilePng, profilePng] },
    { id: 9, title: '아줌마들의 우정을 디질때까지', users: [profilePng, profilePng] },
    { id: 10, title: '무한도전 재밌어요', users: [profilePng, profilePng] },
    { id: 11, title: '냥대 뉴진스ㅋ', users: [profilePng, profilePng] },
    { id: 12, title: '회사 가기 싫잔아요', users: [profilePng, profilePng] },
  ]);
  const colors: Color[] = ['pink', 'yellow', 'blue', 'green', 'gray'];
  const GRID_SIZE = 2;

  const onGridOrderChange: DraggableGridProps['onOrderChange'] = orderedIds => {
    const updateTeamList = orderedIds.map(id => teamList.find(team => team.id === Number(id)));
    console.log('updateTeamList', updateTeamList);
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
    <>
      <HomeHeader />
      <ScrollView
        className="flex-1 bg-white"
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
                    {/* <MotiView
                      from={{ rotate: from }}
                      animate={{ rotate: to }}
                      transition={{
                        type: 'timing',
                        duration: 100,
                        easing: Easing.inOut(Easing.ease),
                        loop: true,
                        repeatReverse: true,
                      }}> */}
                    <FadeIn>
                      <TeamFolder {...item} color={colors[idx % colors.length]} />
                    </FadeIn>
                    {/* </MotiView> */}
                  </Draggable>
                );
              })}
            </DraggableGrid>
          </DndProvider>
          <View className="w-full items-center pt-[18px]">
            <Button size="mid" color="white" icon={<PlusIcon color="#1C1C1E" />}>
              모임 생성하기
            </Button>
          </View>
        </View>
      </ScrollView>
      {/* 모임이 하나도 없다면 */}
      {/* <TeamNotFound /> */}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
});
