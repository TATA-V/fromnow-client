import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDeleteFriend, usePostFriendAccept, usePostFriendRequest } from '@hooks/query';
import { Friend } from '@clientTypes/user';

interface Props extends Friend {
  isFriendReq?: boolean;
}

const FriendItem = (props: Props) => {
  const { friend, profileName, profilePhotoUrl, memberId, isFriendReq } = props;
  const { friendAcceptMutation } = usePostFriendAccept();
  const { friendDeleteMutation } = useDeleteFriend();
  const { friendRequestMutation } = usePostFriendRequest();

  const updateFriend = () => {
    if (friend) {
      friendDeleteMutation.mutate(memberId);
      return;
    }
    if (isFriendReq) {
      friendRequestMutation.mutate(profileName);
      return;
    }
    friendAcceptMutation.mutate(memberId);
  };

  return (
    <View className="h-[60px] rounded-2xl bg-white w-full flex flex-row justify-between items-center px-4">
      <View className="flex flex-row gap-2 items-center">
        <Image source={{ uri: profilePhotoUrl }} className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200" />
        <Text className="text-black900 font-PTDLight text-sm">{profileName}</Text>
      </View>
      <TouchableOpacity
        onPress={updateFriend}
        className={`${friend ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 px-[12.5px] flex justify-center items-center rounded-xl`}>
        <Text className={`${friend ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{friend ? '친구' : '친구추가'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendItem;
