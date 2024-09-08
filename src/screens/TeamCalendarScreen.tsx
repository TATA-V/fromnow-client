import { View, Text } from 'react-native';
import React from 'react';
import TeamHeader from '@components/Team/TeamHeader';
import useCurrentRoute from '@hooks/useCurrentRoute';
import TeamCalendar from '@components/TeamCalendar/TeamCalendar';

interface Props {
  paramName: string;
}

const TeamCalendarScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  console.log('route:', route.params.id);

  return (
    <>
      <View className="pt-[66px]">
        <TeamCalendar />
      </View>
      <TeamHeader title="아줌마들의 우정은 디질때까지" />
    </>
  );
};

export default TeamCalendarScreen;
