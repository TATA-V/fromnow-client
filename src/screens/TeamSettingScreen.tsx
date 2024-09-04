import React from 'react';
import { View, Text } from 'react-native';
import TeamSettingHeader from '@components/TeamSetting/TeamSettingHeader';
import useCurrentRoute from '@hooks/useCurrentRoute';

interface Props {
  paramName: string;
}

const TeamSettingScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  console.log('route:', route.params.id);

  return (
    <>
      <View className="pt-[66px] px-4">
        <Text>TeamSettingScreen</Text>
      </View>
      <TeamSettingHeader title="아줌마들의 우정은 디질때까지" dayCount={20} />
    </>
  );
};

export default TeamSettingScreen;
