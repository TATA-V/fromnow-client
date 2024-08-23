import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

interface Props {
  children: ReactNode;
}

function SAVProvider({ children }: Props) {
  return (
    <SafeAreaView className="bg-white flex-1 w-full">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      {children}
    </SafeAreaView>
  );
}

export default SAVProvider;
