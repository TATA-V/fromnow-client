import { View, Text } from 'react-native';
import React from 'react';
import useCurrentRoute from '@hooks/useCurrentRoute';

interface Props {
  paramName: string;
}

const TeamEditScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  console.log('route:', route.params.id);

  return (
    <View>
      <Text>TeamEditScreen</Text>
    </View>
  );
};

export default TeamEditScreen;
