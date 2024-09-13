import React, { useState } from 'react';
import { ScrollView, View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import TeamItem from '@components/MyTeam/TeamItem';

const { width } = Dimensions.get('window');

const MyTeamRequestScreen = () => {
  const [isAllTeam, setIsAllTeam] = useState(true);

  return (
    <View className="flex-1 bg-black100">
      <View className="h-[70px] px-4 items-center">
        <View className="w-full h-[54px] space-x-3 p-[8px] flex flex-row rounded-full bg-white border-[1px] border-black200">
          <TouchableOpacity
            onPress={() => setIsAllTeam(true)}
            style={styles.button}
            className={`${isAllTeam ? 'bg-black900' : 'bg-white'}  rounded-full w-full h-full flex justify-center items-center`}>
            <Text className={`${isAllTeam ? 'text-white' : 'text-black500'} font-PTDSemiBold text-sm`}>모든 모임</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsAllTeam(false)}
            style={styles.button}
            className={`${!isAllTeam ? 'bg-black900' : 'bg-white'} rounded-full w-full h-full flex justify-center items-center`}>
            <Text className={`${!isAllTeam ? 'text-white' : 'text-black500'} font-PTDSemiBold text-sm`}>받은 모임 요청</Text>
          </TouchableOpacity>
        </View>
      </View>
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
