import React from 'react';
import { View, Text } from 'react-native';
import useNavi from '@hooks/useNavi';
import TeamSettingHeader from '@components/TeamSetting/TeamSettingHeader';

interface Props {
  paramName: string;
}

const TeamSettingScreen = ({}: Props) => {
  // prettier-ignore
  // const { route: { params } } = useNavi();
  // console.log('route:', params.id);

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
