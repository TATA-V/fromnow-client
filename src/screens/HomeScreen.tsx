import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import HomeHeader from '@components/Home/HomeHeader';
import { Color } from '@components/common/TeamFolder';
// import DndTeamList from '@components/Home/DndTeamList';
import TeamList from '@components/Home/TeamList';
import MiniLoading from '@components/common/MiniLoading';
import TeamNotFound from '@components/Home/TeamNotFound';
import { useGetAllTeam } from '@hooks/query';
import useCurrentRoute from '@hooks/useCurrentRoute';
import useUserStore from '@store/useUserStore';
import { getOne } from '@api/user';

const HomeScreen = () => {
  const [isEdit, setIsEdit] = useState(false);
  const colors: Color[] = ['pink', 'yellow', 'blue', 'green', 'gray'];

  const { data, isLoading } = useGetAllTeam();

  // 로그인시에 응답데이터로 profileName 달라고해야 함 그래야 여기서 한번 더 요청을 안함
  const { route } = useCurrentRoute();
  const setName = useUserStore(state => state.setName);
  useEffect(() => {
    if (route.params && route.params.refresh) {
      getOne().then(res => {
        setName(res.profileName);
      });
    }
  }, [route.params]);

  if (isLoading) return <MiniLoading />;

  return (
    <>
      <View className="bg-black100 flex-1">
        <HomeHeader isEdit={isEdit} setIsEdit={setIsEdit} />
        {/* {isEdit && <DndTeamList teamList={data} colors={colors} />} */}
        {/* {!isEdit && <TeamList teamList={data} colors={colors} />} */}
        <TeamList teamList={data} colors={colors} />
        {data?.length === 0 && <TeamNotFound />}
      </View>
    </>
  );
};

export default HomeScreen;
