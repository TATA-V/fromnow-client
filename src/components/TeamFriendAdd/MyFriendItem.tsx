import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CircleXIcon from '@assets/icons/CircleXIcon';
import { Friend } from '@clientTypes/friend';
import { useModal } from '@components/Modal';
import { useDeleteFriend, useInviteTeam } from '@hooks/query';
import { useDebounce } from '@hooks/useOptimization';
import useSelectedTeamStore from '@store/useSelectedTeamStore';

const MyFriendItem = (props: Friend) => {
  const { memberId, profileName, profilePhotoUrl } = props;
  const { friendDeleteMutation } = useDeleteFriend();
  const { showModal } = useModal();
  const { inviteTeamMutation } = useInviteTeam();
  const { id: diaryId, title } = useSelectedTeamStore(state => state);

  const addUserToTeam = () => {
    showModal({
      type: 'dialog',
      title: '친구 초대',
      description: `${profileName} 님을 ${title}에\n초대하시겠습니까?`,
      confirm: () => inviteTeamMutation.mutate({ diaryId, profileNames: [profileName] }),
    });
  };

  const deleteOne = useDebounce(() => {
    showModal({
      type: 'dialog',
      title: '친구 삭제',
      description: `정말로 ${profileName} 님을 삭제하시겠습니까?`,
      confirm: () => friendDeleteMutation.mutate(memberId),
    });
  }, 500);

  return (
    <View className="h-[60px] w-[42px] px-[3px] py-[4px] items-center justify-between">
      <View onTouchEnd={addUserToTeam} className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200">
        <Image source={{ uri: profilePhotoUrl }} className="w-full h-full rounded-xl" resizeMode="cover" />
      </View>
      <Text className="text-black900 text-sm font-PTDLight leading-6">{profileName}</Text>
      <TouchableOpacity onPress={deleteOne} className="absolute top-0 right-0">
        <View className="bg-white rounded-full">
          <CircleXIcon size={16} color="#6E6D73" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MyFriendItem;
