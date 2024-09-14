import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ActionSheet, { SheetManager } from 'react-native-actions-sheet';
import SelectTeamItem from '@components/PostEdit/SelectTeamItem';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';

const SelectTeam = () => {
  const { navigation } = useNavi();

  const confirmTeamSelection = () => {
    navigation.navigate('Home');
    SheetManager.hide('select-team');
  };

  return (
    <ActionSheet containerStyle={styles.container}>
      <View className="relative h-full justify-between">
        <View>
          <View className="h-[22px] justify-center items-center">
            <TouchableOpacity onPress={() => SheetManager.hide('select-team')} className="p-[5px]">
              <View className="bg-[#D7D7D7] w-[40px] h-[3.5px] rounded-[10.49px]" />
            </TouchableOpacity>
          </View>
          <View className="h-[66px] justify-center items-center">
            <Text className="text-black900 text-base font-PTDSemiBold">보여줄 모임 선택하기</Text>
          </View>
          <FlatList
            data={[...Array(1)]}
            keyExtractor={(_, key) => key.toString()}
            renderItem={({ item, index }) => <SelectTeamItem key={index} isSharing={false} />}
            ItemSeparatorComponent={() => <View className="h-[10px]" />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
            ListFooterComponent={() => <View className="h-[168px]" />}
          />
        </View>
        <View className="absolute bottom-0 pb-[20px] pt-4 w-full bg-white">
          <Button onPress={confirmTeamSelection}>다음</Button>
        </View>
      </View>
    </ActionSheet>
  );
};

export default SelectTeam;

const styles = StyleSheet.create({
  container: {
    height: 582,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
});
