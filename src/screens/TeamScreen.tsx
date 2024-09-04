import React from 'react';
import { View, Text } from 'react-native';
import useNavi from '@hooks/useNavi';
import TeamHeader from '@components/Team/TeamHeader';

interface Props {
  paramName: string;
}

const TeamScreen = ({}: Props) => {
  // prettier-ignore
  // const { route: { params } } = useNavi();
  // console.log('route:', params.id);
  return (
    <>
      <View className="pt-[66px]">
        <View className="px-4">
          <Text>TeamScreen</Text>
        </View>
      </View>
      <TeamHeader title="아줌마들의 우정은 디질때까지" />
    </>
  );
};

export default TeamScreen;
