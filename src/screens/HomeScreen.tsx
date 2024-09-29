import React, { useState } from 'react';
import { View } from 'react-native';
import HomeHeader from '@components/Home/HomeHeader';
import { Color } from '@components/common/TeamFolder';
// import DndTeamList from '@components/Home/DndTeamList';
import TeamList from '@components/Home/TeamList';
import MiniLoading from '@components/common/MiniLoading';
import TeamNotFound from '@components/Home/TeamNotFound';
import { useGetAllTeam } from '@hooks/query';

const HomeScreen = () => {
  // const [isEdit, setIsEdit] = useState(false);
  const colors: Color[] = ['pink', 'yellow', 'blue', 'green', 'gray'];

  const { data, isLoading } = useGetAllTeam();

  if (isLoading) return <MiniLoading />;

  return (
    <>
      <View className="bg-black100 flex-1">
        {/* <HomeHeader isEdit={isEdit} setIsEdit={setIsEdit} /> */}
        <HomeHeader />
        {/* {isEdit && <DndTeamList teamList={data} colors={colors} />} */}
        {/* {!isEdit && <TeamList teamList={data} colors={colors} />} */}
        <TeamList teamList={data} colors={colors} />
        {data?.length === 0 && <TeamNotFound />}
      </View>
    </>
  );
};

export default HomeScreen;
