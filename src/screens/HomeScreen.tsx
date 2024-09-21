import React, { useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import profilePng from '@assets/png/profile.png';
import HomeHeader from '@components/Home/HomeHeader';
import { Color } from '@components/common/TeamFolder';
import DndTeamList from '@components/Home/DndTeamList';
import TeamList from '@components/Home/TeamList';
import FadeIn from '@components/common/FadeIn';

export interface Team {
  id: number;
  title: string;
  users: string[] | ImageSourcePropType[];
}

const HomeScreen = () => {
  const [isEdit, setIsEdit] = useState(false);

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

  // const { data, isLoading } = useGetAllTeam();
  // console.log('data:', data);

  // if (isLoading) return <MiniLoading />;

  return (
    <View className="bg-black100 flex-1">
      <HomeHeader isEdit={isEdit} setIsEdit={setIsEdit} />
      {isEdit && <DndTeamList teamList={teamList} colors={colors} />}
      {!isEdit && <TeamList teamList={teamList} colors={colors} />}
      {/* 모임이 하나도 없다면 */}
      {/* <TeamNotFound /> */}
    </View>
  );
};

export default HomeScreen;
