import { View, Text } from 'react-native';
import React from 'react';
import useNavi from '@hooks/useNavi';

interface Props {
  paramName: string;
}

const TeamEditScreen = ({}: Props) => {
  // prettier-ignore
  // const { route: { params } } = useNavi();
  // console.log('route:', params.id);

  return (
    <View>
      <Text>TeamEditScreen</Text>
    </View>
  );
};

export default TeamEditScreen;
