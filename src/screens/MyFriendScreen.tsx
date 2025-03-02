import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, RefreshControl, FlatList } from 'react-native';
import SearchIcon from '@assets/icons/SearchIcon';
import { QUERY_KEY, useGetAllMyFriend, useGetAllMyFriendRequest, useKey, usePostFriendReject } from '@hooks/query';
import { Friend } from '@clientTypes/friend';
import useNavi from '@hooks/useNavi';
import useRefresh from '@hooks/useRefresh';
import { Swipeable } from 'react-native-gesture-handler';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { useDebounce } from '@hooks/useOptimization';
import { useIsFocused } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import useDeviceSize from '@hooks/useDeviceSize';
import { useTranslation } from 'react-i18next';
import { cn } from '@utils/cn';

import FullScreenMiniLoading from '@components/common/FullScreenMiniLoading';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import DeleteButton from '@components/common/DeleteButton';
import FriendItem from '@components/common/FriendItem';
import Button from '@components/common/Button';

interface Props {
  paramName: string;
}

const MyFriendScreen = ({}: Props) => {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const { width } = useDeviceSize();
  const styles = createStyles(width);
  const isFocused = useIsFocused();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const isReq = route.params.req;
  const [isAllFriend, setIsAllFriend] = useState(isReq ? false : true);

  const [isInitialRender, setIsInitialRender] = useState(false);
  const { data: myFriendData, isLoading: isLoadingMyFriend, refetch: refetchMyFriend } = useGetAllMyFriend({ options: { enabled: isInitialRender } });
  const {
    data: myFriendRqData,
    isLoading: isLoadingFriendRq,
    refetch: refetchMyFriendReq,
  } = useGetAllMyFriendRequest({ options: { enabled: isInitialRender } });
  let data: Friend[] = isAllFriend ? myFriendData : myFriendRqData;
  let queryKey = isAllFriend ? useKey([QUERY_KEY.MY, 'friends']) : useKey([QUERY_KEY.MY, 'friend', 'request']);
  let refetch = isAllFriend ? refetchMyFriend : refetchMyFriendReq;
  const { refreshing, onRefresh } = useRefresh({ queryKey });

  const { friendRequestMutation } = usePostFriendReject();

  const deleteFriendReq = useDebounce((id: number) => {
    friendRequestMutation.mutate(id);
  }, 500);

  useEffect(() => {
    if (!isFocused || isInitialRender) return;
    queryClient.removeQueries({ queryKey });
    refetch();
    setIsInitialRender(true);
  }, [isFocused]);

  return (
    <View className="flex-1 bg-black100">
      <View className="h-[70px] px-4 items-center">
        <View className="w-full h-[54px] space-x-3 p-[8px] flex flex-row rounded-full bg-white border-[1px] border-black200">
          <TouchableOpacity
            onPress={() => setIsAllFriend(true)}
            style={styles.button}
            className={cn(isAllFriend ? 'bg-black900' : 'bg-white', 'rounded-full w-full h-full flex justify-center items-center')}>
            <Text className={cn(isAllFriend ? 'text-white' : 'text-black500', 'font-PTDSemiBold text-sm')}>모든 친구</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsAllFriend(false)}
            style={styles.button}
            className={cn(isAllFriend ? 'bg-white' : 'bg-black900', 'rounded-full w-full h-full flex justify-center items-center')}>
            <Text className={cn(!isAllFriend ? 'text-white' : 'text-black500', 'font-PTDSemiBold text-sm')}>받은 친구 요청</Text>
          </TouchableOpacity>
        </View>
      </View>
      {(isLoadingMyFriend || isLoadingFriendRq) && (!data || data?.length === 0) && <FullScreenMiniLoading />}
      {data?.length > 0 && (
        <View className="bg-white rounded-2xl border-[1px] border-black200 overflow-hidden mx-4 mb-[97px] mt-[4px]">
          <FlatList
            data={data}
            keyExtractor={friend => friend.memberId.toString()}
            renderItem={({ item }) => (
              <Swipeable
                key={item.memberId}
                enabled={!isAllFriend}
                renderRightActions={() => <DeleteButton id={item.memberId} onDelete={deleteFriendReq} />}>
                <FriendItem {...item} />
              </Swipeable>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
      {data?.length === 0 && !isLoadingMyFriend && !isLoadingFriendRq && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View className="w-full h-full justify-center items-center transfrom translate-y-[-70px]" pointerEvents="box-none">
            <AvatarSadMsg message={isAllFriend ? `${t('avatar.noFriends')}` : `${t('avatar.noReceivedRequests')}`} />
            <View className="mt-[24px]">
              <Button onPress={() => navigation.navigate('Search')} size="mid" icon={<SearchIcon color="#fff" size={24} />}>
                {t('myFriend.find')}
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyFriendScreen;

const createStyles = (width: number) =>
  StyleSheet.create({
    button: {
      width: (width - 48 - 12) / 2,
    },
  });
