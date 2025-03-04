import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { FlashList } from '@shopify/flash-list';
import { QUERY_KEY, useGetAllMyFriend, useGetSearchTeamFriend, useGetTeamMenu, useInviteTeam, useKey } from '@hooks/query';
import { useQueryClient } from '@tanstack/react-query';
import { useDebounce } from '@hooks/useOptimization';
import useKakaoShare from '@hooks/useKakaoShare';
import useUserStore from '@store/useUserStore';
import { KAKAO_SHARE_IMG } from '@env';
import { useTranslation } from 'react-i18next';

import TeamFriendItem from '@components/TeamFriendAdd/TeamFriendItem';
import MyFriendItem from '@components/TeamFriendAdd/MyFriendItem';
import DismissKeyboard from '@components/common/DismissKeyboard';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';
import MiniLoading from '@components/common/MiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import FadeIn from '@components/common/FadeIn';

interface Props {
  paramName: string;
}

const TeamFriendAddScreen = ({}: Props) => {
  const [search, setSearch] = useState('');
  const { kakaoShare } = useKakaoShare();
  const username = useUserStore(state => state.name);
  const { route } = useCurrentRoute();
  const teamId = route.params.id;
  const { t } = useTranslation();

  const [hasSearched, setHasSearched] = useState(false);
  const [submitSearch, setSubmitSearch] = useState('');
  const {
    data: searchData,
    isLoading: searchLoading,
    refetch: searchRefetch,
  } = useGetSearchTeamFriend({
    diaryId: teamId,
    profileName: submitSearch.trim(),
    options: { enabled: hasSearched },
  });
  const { data: myFriendData } = useGetAllMyFriend();
  const { data: teamData } = useGetTeamMenu({ teamId });

  const filteredFriends = (myFriendData || []).filter(friend => {
    return !teamData.some(team => team.memberId === friend.memberId);
  });

  const startSearch = () => {
    if (hasSearched) return;
    setHasSearched(true);
  };

  const findFriends = useDebounce(() => {
    startSearch();
    setSubmitSearch(search);
  }, 500);

  const [profileNames, setProfileNames] = useState<string[]>([]);
  useEffect(() => {
    if (searchData) setProfileNames([]);
  }, [searchData]);

  const { inviteTeamMutation } = useInviteTeam();
  const queryClient = useQueryClient();
  const teamFriendSearchKey = useKey(['search', QUERY_KEY.FRIEND, QUERY_KEY.TEAM, submitSearch.trim()]);
  const addUserToTeam = () => {
    if (profileNames.length === 0) return;
    inviteTeamMutation.mutate(
      { diaryId: teamId, profileNames },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: teamFriendSearchKey });
          searchRefetch();
          setProfileNames([]);
        },
      },
    );
  };
  const debounceAddUserToTeam = useDebounce(addUserToTeam, 500);

  const shareInviteLink = async () => {
    await kakaoShare({
      title: t('teamFriendAdd.inviteTitle'),
      description: `${username}${t('teamFriendAdd.invitedMessage')}`,
      imageUrl: `${KAKAO_SHARE_IMG}`,
      params: { deepLink: `fromnow://team-invite/${teamId}` },
    });
  };

  return (
    <DismissKeyboard>
      <>
        <View className="flex-1">
          {filteredFriends?.length > 0 && (
            <FlashList
              data={filteredFriends}
              keyExtractor={item => item.memberId.toString()}
              renderItem={({ item, index }) => <MyFriendItem key={index} {...item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
              ItemSeparatorComponent={() => <View className="w-[6px]" />}
              initialScrollIndex={filteredFriends.length > 0 ? 0 : undefined}
              estimatedItemSize={60}
              estimatedFirstItemOffset={0}
            />
          )}
          <View className="px-4">
            <View className="h-[66px]">
              <Input
                autoFocus={hasSearched ? false : true}
                onSubmitEditing={findFriends}
                value={search}
                setValue={setSearch}
                search
                placeholder={t('teamFriendAdd.searchPlaceholder')}
              />
            </View>
            {searchData && searchData.length > 0 && hasSearched && (
              <View className="h-full my-[4px]">
                <FlashList
                  data={searchData}
                  keyboardShouldPersistTaps="always"
                  keyExtractor={item => item.memberId.toString()}
                  renderItem={({ item, index }) => (
                    <FadeIn key={item.memberId}>
                      <TeamFriendItem
                        profileNames={profileNames}
                        setProfileNames={setProfileNames}
                        {...item}
                        index={index}
                        length={searchData.length}
                      />
                    </FadeIn>
                  )}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() => <View className="h-[370px]" />}
                  initialScrollIndex={searchData.length > 0 ? 0 : undefined}
                  estimatedItemSize={60}
                  estimatedFirstItemOffset={0}
                />
              </View>
            )}
            {searchLoading && (
              <View className="bg-[#FBFBFD] pt-10">
                <MiniLoading />
              </View>
            )}
            {(!searchData || searchData.length === 0) && hasSearched && !searchLoading && (
              <View className="pt-[95px]">
                <AvatarSadMsg message={t('avatar.friendNotFoundShort')} />
              </View>
            )}
          </View>
        </View>
        {hasSearched && (
          <KeyboardAvoiding>
            <View className="absolute bottom-[-5px] pt-1 pb-[20px] px-4 items-center w-full bg-black100">
              <View className="flex-row space-x-[2px] mb-4">
                <Text className="text-black700 text-[12px] font-PTDLight">{t('teamFriendAdd.friendNotFound')}</Text>
                <TouchableOpacity onPress={shareInviteLink}>
                  <Text className="text-black700 text-[12px] font-PTDSemiBold underline">{t('teamFriendAdd.shareInviteLink')}</Text>
                </TouchableOpacity>
              </View>
              <Button onPress={debounceAddUserToTeam}>
                {profileNames.length}
                {t('teamFriendAdd.inviteCount')}
              </Button>
            </View>
          </KeyboardAvoiding>
        )}
      </>
    </DismissKeyboard>
  );
};

export default TeamFriendAddScreen;
