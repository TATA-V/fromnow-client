import React, { ReactNode } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

interface Props {
  children: ReactNode;
  isDarkMode?: boolean;
}

function SAVProvider({ children, isDarkMode = false }: Props) {
  return (
    <SafeAreaView className="flex-1 w-full">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1C1C1E' : '#fff'} />
      {children}
    </SafeAreaView>
  );
}

export default SAVProvider;
