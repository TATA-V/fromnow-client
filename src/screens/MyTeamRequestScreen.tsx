import React, { useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import TeamItem from '@components/MyTeam/TeamItem';

const { width } = Dimensions.get('window');

const MyTeamRequestScreen = () => {
  const [isAllTeam, setIsAllTeam] = useState(true);

  return (
    <View className="flex-1 bg-black100">
      <ScrollView className="px-4 pt-[4px]" contentContainerStyle={{ paddingBottom: 30 }}>
        <View className="bg-white rounded-2xl border-[1px] border-black200 overflow-hidden">
          {[...Array(20)].map((_, idx) => (
            <TeamItem key={idx} isTeam={isAllTeam} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyTeamRequestScreen;

const styles = StyleSheet.create({
  button: {
    width: (width - 48 - 12) / 2,
  },
});
