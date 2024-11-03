import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Dimensions, RefreshControl, FlatList } from 'react-native';
import FriendItem from '@components/common/FriendItem';
import AvatarSadMsg from '@components/common/AvatarSadMsg';
import Button from '@components/common/Button';
import MiniLoading from '@components/common/MiniLoading';
import SearchIcon from '@assets/icons/SearchIcon';
import { QUERY_KEY, useGetAllMyFriend, useGetAllMyFriendRequest, useKey, usePostFriendReject } from '@hooks/query';
import { Friend } from '@clientTypes/friend';
import useNavi from '@hooks/useNavi';
import useRefresh from '@hooks/useRefresh';
import DeleteButton from '@components/common/DeleteButton';
import { Swipeable } from 'react-native-gesture-handler';
import useCurrentRoute from '@hooks/useCurrentRoute';

interface Props {
  paramName: string;
}

const { width } = Dimensions.get('window');

const MyFriendScreen = ({}: Props) => {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const isReq = route.params.req;
  const [isAllFriend, setIsAllFriend] = useState(isReq ? false : true);

  const { data: myFriendData, isLoading: isLoadingMyFriend } = useGetAllMyFriend();
  const { data: myFriendRqData, isLoading: isLoadingFriendRq } = useGetAllMyFriendRequest();
  let data: Friend[] = isAllFriend ? myFriendData : myFriendRqData;
  let queryKey = isAllFriend ? useKey([QUERY_KEY.MY, 'friends']) : useKey([QUERY_KEY.MY, 'friend', 'request']);
  const { refreshing, onRefresh } = useRefresh({ queryKey });

  const { friendRequestMutation } = usePostFriendReject();

  const deleteFriendReq = (id: number) => {
    friendRequestMutation.mutate(id);
  };

  if (isLoadingMyFriend || isLoadingFriendRq)
    return (
      <View className="flex-1 bg-[#F8F8FB]">
        <MiniLoading />
      </View>
    );

  return (
    <View className="flex-1 bg-black100">
      <View className="h-[70px] px-4 items-center">
        <View className="w-full h-[54px] space-x-3 p-[8px] flex flex-row rounded-full bg-white border-[1px] border-black200">
          <TouchableOpacity
            onPress={() => setIsAllFriend(true)}
            style={styles.button}
            className={`${isAllFriend ? 'bg-black900' : 'bg-white'}  rounded-full w-full h-full flex justify-center items-center`}>
            <Text className={`${isAllFriend ? 'text-white' : 'text-black500'} font-PTDSemiBold text-sm`}>모든 친구</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsAllFriend(false)}
            style={styles.button}
            className={`${isAllFriend ? 'bg-white' : 'bg-black900'} rounded-full w-full h-full flex justify-center items-center`}>
            <Text className={`${!isAllFriend ? 'text-white' : 'text-black500'} font-PTDSemiBold text-sm`}>받은 친구 요청</Text>
          </TouchableOpacity>
        </View>
      </View>
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
      {data?.length === 0 && (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View className="w-full h-full justify-center items-center transfrom translate-y-[-136px]" pointerEvents="box-none">
            <AvatarSadMsg message={isAllFriend ? `아직 친구가 없어요\n새로운 친구를 찾아보세요!` : `아직 받은\n친구 요청이 없어요`} />
            <View className="mt-[24px]">
              <Button onPress={() => navigation.navigate('Search')} size="mid" icon={<SearchIcon color="#fff" size={24} />}>
                친구 찾아보기
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default MyFriendScreen;

const styles = StyleSheet.create({
  button: {
    width: (width - 48 - 12) / 2,
  },
});
