import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import MyFriendItem from '@components/TeamFriendAdd/MyFriendItem';
import TeamFriendItem from '@components/TeamFriendAdd/TeamFriendItem';
import { FlashList } from '@shopify/flash-list';

interface Props {
  paramName: string;
}

const TeamFriendAddScreen = ({}: Props) => {
  const [search, setSearch] = useState('');
  const { route } = useCurrentRoute();
  console.log('id:', route.params.id);
  const searchResults = [...Array(50)];

  // 검색 제출
  const onSubmitEditing = () => {};

  const addUserToTeam = () => {};

  return (
    <>
      <View>
        <FlashList
          data={[...Array(20)]}
          keyExtractor={(_, key) => key.toString()}
          renderItem={({ item, index }) => <MyFriendItem key={index} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          ItemSeparatorComponent={() => <View className="w-[6px]" />}
          initialScrollIndex={0}
          estimatedItemSize={60}
          estimatedFirstItemOffset={0}
        />
        <View className="px-4">
          <View className="h-[66px]">
            <Input onSubmitEditing={onSubmitEditing} value={search} setValue={setSearch} search placeholder="친구 검색" />
          </View>
          <View className="h-full my-[4px]">
            <FlashList
              data={searchResults}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => <TeamFriendItem key={index} isTeam index={index} length={searchResults.length} />}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() => <View className="h-[570px]" />}
              initialScrollIndex={0}
              estimatedItemSize={60}
              estimatedFirstItemOffset={0}
            />
          </View>
        </View>
      </View>
      <View className="absolute bottom-0 pt-1 pb-[20px] px-4 items-center w-full bg-black100">
        <View className="flex-row space-x-[2px] mb-4">
          <Text className="text-black700 text-[12px] font-PTDLight">친구가 아닌가요?</Text>
          <TouchableOpacity>
            <Text className="text-black700 text-[12px] font-PTDSemiBold underline">아이디로 초대하기</Text>
          </TouchableOpacity>
        </View>
        <Button onPress={addUserToTeam}>00명 초대하기</Button>
      </View>
    </>
  );
};

export default TeamFriendAddScreen;
