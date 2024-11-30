import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CircleXIcon from '@assets/icons/CircleXIcon';
import { Friend } from '@clientTypes/friend';
import { useModal } from '@components/Modal';
import { useDeleteFriend } from '@hooks/query';
import { useDebounce } from '@hooks/useOptimization';

const MyFriendItem = (props: Friend) => {
  const { memberId, profileName, profilePhotoUrl } = props;
  const { friendDeleteMutation } = useDeleteFriend();
  const { showModal } = useModal();

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
      <View className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200">
        <Image source={{ uri: profilePhotoUrl }} className="w-[36px] h-[36px] rounded-xl" resizeMode="cover" />
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
