import React, { useState } from 'react';
import { FlatList, ImageSourcePropType, View } from 'react-native';
import useNavi from '@hooks/useNavi';
import HomeHeader from '@components/Home/HomeHeader';
import PlusIcon from '@assets/icons/PlusIcon';
import profilePng from '@assets/png/profile.png';
import Button from '@components/common/Button';
import TeamFolder, { Color } from '@components/common/TeamFolder';
import TeamNotFound from '@components/Home/TeamNotFound';
import DraggableFlatList from 'react-native-draggable-flatlist';

export interface Team {
  id: number;
  title: string;
  users: string[] | ImageSourcePropType[];
}

const HomeScreen = () => {
  const { navigation } = useNavi();
  const [teamList, setTeamList] = useState<Team[]>([
    { id: 1, title: '아줌마들의 우정을 디질때까지', users: [profilePng, profilePng] },
    { id: 2, title: '무한도전 재밌어요', users: [profilePng, profilePng] },
    { id: 3, title: '냥대 뉴진스ㅋ', users: [profilePng, profilePng] },
    { id: 4, title: '회사 가기 싫잔아요', users: [profilePng, profilePng] },
    //
    // { id: 5, title: '아줌마들의 우정을 디질때까지', users: [profilePng, profilePng] },
    // { id: 6, title: '무한도전 재밌어요', users: [profilePng, profilePng] },
    // { id: 7, title: '냥대 뉴진스ㅋ', users: [profilePng, profilePng] },
    // { id: 8, title: '회사 가기 싫잔아요', users: [profilePng, profilePng] },
    // { id: 9, title: '아줌마들의 우정을 디질때까지', users: [profilePng, profilePng] },
    // { id: 10, title: '무한도전 재밌어요', users: [profilePng, profilePng] },
    // { id: 11, title: '냥대 뉴진스ㅋ', users: [profilePng, profilePng] },
    // { id: 12, title: '회사 가기 싫잔아요', users: [profilePng, profilePng] },
  ]);
  const colors: Color[] = ['pink', 'yellow', 'blue', 'green', 'gray'];

  return (
    <>
      <HomeHeader />
      <View className="flex w-full items-center flex-1">
        <FlatList
          data={teamList}
          keyExtractor={team => team.id.toString()}
          renderItem={({ item, index }) => (
            <View className={`${index % 2 !== 0 ? 'mr-0' : 'mr-[18px]'}`}>
              <TeamFolder {...item} color={colors[index % colors.length]} />
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ width: 18, height: 18 }} />}
          contentContainerStyle={{ position: 'relative', paddingHorizontal: 18, paddingTop: 16, paddingBottom: 6 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View className="mb-[25px] w-full items-center pt-[12px]">
              <Button size="mid" color="white" icon={<PlusIcon color="#1C1C1E" />}>
                모임 생성하기
              </Button>
            </View>
          }
          numColumns={2}
        />
      </View>
      {/* 모임이 하나도 없다면 */}
      {/* <TeamNotFound /> */}
    </>
  );
};

export default HomeScreen;
