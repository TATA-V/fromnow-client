import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import MyFriendItem from '@components/TeamFriendAdd/MyFriendItem';
import TeamFriendItem from '@components/TeamFriendAdd/TeamFriendItem';
import { FlashList } from '@shopify/flash-list';
import DismissKeyboard from '@components/common/DismissKeyboard';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';
import { useGetAllMyFriend, useGetSearchTeamFriend, useInviteTeam } from '@hooks/query';
import MiniLoading from '@components/common/MiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import { Share } from 'react-native';
import { CLIENT_URL } from '@env';

interface Props {
  paramName: string;
}

const TeamFriendAddScreen = ({}: Props) => {
  const [search, setSearch] = useState('');
  const { route } = useCurrentRoute();
  const teamId = route.params.id;

  const [hasSearched, setHasSearched] = useState(false);
  const [submitSearch, setSubmitSearch] = useState('');
  const { data: searchData, isLoading: searchLoading } = useGetSearchTeamFriend({
    diaryId: teamId,
    profileName: submitSearch.trim(),
    options: { enabled: hasSearched },
  });
  const { data: myFriendData } = useGetAllMyFriend();

  const startSearch = () => {
    if (hasSearched) return;
    setHasSearched(true);
  };

  const findFriends = () => {
    startSearch();
    setSubmitSearch(search);
  };

  const [profileNames, setProfileNames] = useState<string[]>([]);
  useEffect(() => {
    if (searchData) setProfileNames([]);
  }, [searchData]);

  const { inviteTeamMutation } = useInviteTeam();
  const addUserToTeam = () => {
    if (profileNames.length === 0) return;
    console.log('addUserToTeam');
    inviteTeamMutation.mutate({ diaryId: teamId, profileNames });
  };

  return (
    <>
      <DismissKeyboard>
        <View className="flex-1">
          {myFriendData?.length > 0 && (
            <FlashList
              data={myFriendData}
              keyExtractor={(_, key) => key.toString()}
              renderItem={({ item, index }) => <MyFriendItem key={index} {...item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
              ItemSeparatorComponent={() => <View className="w-[6px]" />}
              initialScrollIndex={0}
              estimatedItemSize={60}
              estimatedFirstItemOffset={0}
            />
          )}
          <View className="px-4">
            <View className="h-[66px]">
              <Input onSubmitEditing={findFriends} value={search} setValue={setSearch} search placeholder="친구 검색" autoFocus />
            </View>
            {searchData && hasSearched && (
              <View className="h-full my-[4px]">
                <FlashList
                  data={searchData}
                  keyboardShouldPersistTaps="always"
                  keyExtractor={(_, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TeamFriendItem setProfileNames={setProfileNames} key={index} {...item} index={index} length={searchData.length} />
                  )}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => <View className="h-[370px]" />}
                  initialScrollIndex={0}
                  estimatedItemSize={60}
                  estimatedFirstItemOffset={0}
                />
              </View>
            )}
            {searchLoading && (
              <View className="bg-[#FBFBFD]">
                <MiniLoading />
              </View>
            )}
            {!searchData && hasSearched && (
              <View className="pt-[95px]">
                <AvatarSadMsg message={`친구를 찾지 못했어요 ;(`} />
              </View>
            )}
          </View>
        </View>
      </DismissKeyboard>
      {hasSearched && (
        <KeyboardAvoiding>
          <View className="absolute bottom-[-5px] pt-1 pb-[20px] px-4 items-center w-full bg-black100">
            <View className="flex-row space-x-[2px] mb-4">
              <Text className="text-black700 text-[12px] font-PTDLight">친구를 찾을 수 없나요?</Text>
              <TouchableOpacity onPress={async () => await Share.share({ message: `${CLIENT_URL}TeamSetting/${teamId}` })}>
                <Text className="text-black700 text-[12px] font-PTDSemiBold underline">초대링크 공유하기</Text>
              </TouchableOpacity>
            </View>
            <Button onPress={addUserToTeam}>{profileNames.length}명 초대하기</Button>
          </View>
        </KeyboardAvoiding>
      )}
    </>
  );
};

export default TeamFriendAddScreen;
