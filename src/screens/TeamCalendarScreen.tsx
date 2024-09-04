import { View, Text } from 'react-native';
import React from 'react';
import useNavi from '@hooks/useNavi';
import TeamHeader from '@components/Team/TeamHeader';

interface Props {
  paramName: string;
}

const TeamCalendarScreen = ({}: Props) => {
  // prettier-ignore
  // const { route: { params } } = useNavi();
  // console.log('route:', params.id);

  return (
    <>
      <View className="pt-[66px] px-4">
        <Text>TeamCalendarScreen</Text>
      </View>
      <TeamHeader title="아줌마들의 우정은 디질때까지" />
    </>
  );
};

export default TeamCalendarScreen;
