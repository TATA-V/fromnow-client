import React, { useEffect } from 'react';
import { Alert, Text, View } from 'react-native';
import HomeHeader from '@components/Home/HomeHeader';
import { Color } from '@components/common/TeamFolder';
import DndTeamList from '@components/Home/DndTeamList';
import TeamList from '@components/Home/TeamList';
import MiniLoading from '@components/common/MiniLoading';
import TeamNotFound from '@components/Home/TeamNotFound';
import { useGetAllTeam } from '@hooks/query';
import RNFS from 'react-native-fs';

const HomeScreen = () => {
  // const [isEdit, setIsEdit] = useState(false);
  const colors: Color[] = ['pink', 'yellow', 'blue', 'green', 'gray'];

  const { data, isLoading } = useGetAllTeam();

  if (isLoading)
    return (
      <View className="flex-1 h-full justify-center items-center bg-white">
        <View className="transform translate-y-[-70px]">
          <MiniLoading />
        </View>
      </View>
    );

  return (
    <View className="bg-black100 flex-1">
      {/* <HomeHeader isEdit={isEdit} setIsEdit={setIsEdit} />
        {isEdit && data && <DndTeamList teamList={data} colors={colors} />}
        {!isEdit && data && <TeamList teamList={data} colors={colors} />} */}
      <HomeHeader />
      {data && <TeamList teamList={data} colors={colors} />}
      {data?.length === 0 && <TeamNotFound />}
    </View>
  );
};

export default HomeScreen;
