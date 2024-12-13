import React from 'react';
import { Text, Image, TouchableOpacity, View } from 'react-native';
import { TeamMenu } from '@clientTypes/team';
import { useDeleteFriend, usePostFriendRequest } from '@hooks/query';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import useUserStore from '@store/useUserStore';
import { useModal } from '@components/Modal';
import { useDebounce } from '@hooks/useOptimization';
import CrownIcon from '@assets/icons/crown.svg';

const FriendItem = (props: TeamMenu) => {
  const { memberId, profileName, photoUrl, owner, friend } = props;
  const diaryId = useSelectedTeamStore(state => state.id);
  const name = useUserStore(state => state.name);
  const { friendDeleteMutation } = useDeleteFriend(diaryId, true);
  const { friendRequestMutation } = usePostFriendRequest(true);
  const { showModal } = useModal();

  const updateFriend = () => {
    if (friend) {
      const confirm = () => {
        friendDeleteMutation.mutate(memberId);
      };
      showModal({ type: 'dialog', title: '친구 삭제', description: `정말로 ${profileName} 님을 삭제하시겠습니까?`, confirm });
      return;
    }
    friendRequestMutation.mutate(profileName);
  };
  const debounceUpdateFriend = useDebounce(updateFriend, 500);

  return (
    <View className="h-[60px] flex-row justify-between items-center">
      <View className="flex-row space-x-[8px] items-center">
        <View className="w-[48px] h-[48px] rounded-2xl border-[1px] border-black200">
          <Image source={{ uri: photoUrl }} className="w-full h-full rounded-2xl justify-center items-center" />
        </View>
        {owner && <CrownIcon />}
        <Text className="text-black900 text-sm font-PTDLight">{profileName}</Text>
      </View>
      {name !== profileName && (
        <TouchableOpacity
          onPress={debounceUpdateFriend}
          className={`${friend ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
            h-9 w-[74px] flex justify-center items-center rounded-xl`}>
          <Text className={`${friend ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{friend ? '친구' : '친구추가'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FriendItem;
