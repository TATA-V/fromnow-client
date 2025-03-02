import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useDeleteFriend, usePostFriendAccept, usePostFriendRequest } from '@hooks/query';
import { Friend } from '@clientTypes/friend';
import { useModal } from '@components/Modal';
import { useDebounce } from '@hooks/useOptimization';
import { useTranslation } from 'react-i18next';
import { cn } from '@utils/cn';
import { isKo } from '@utils/localize';

interface Props extends Friend {
  isFriendReq?: boolean;
}

const FriendItem = (props: Props) => {
  const { friend, profileName, profilePhotoUrl, memberId, isFriendReq } = props;
  const { friendAcceptMutation } = usePostFriendAccept();
  const { friendDeleteMutation } = useDeleteFriend();
  const { friendRequestMutation } = usePostFriendRequest();
  const { showModal } = useModal();
  const { t } = useTranslation();

  const updateFriend = () => {
    if (isFriendReq && !friend) {
      friendRequestMutation.mutate(profileName);
      return;
    }
    if (friend) {
      const confirm = () => {
        friendDeleteMutation.mutate(memberId);
      };
      showModal({
        type: 'dialog',
        title: `${t('signin.remove')}`,
        description: isKo() ? `정말로 ${profileName} 님을 삭제하시겠습니까?` : 'Remove this friend?',
        confirm,
      });
      return;
    }
    friendAcceptMutation.mutate(memberId);
  };
  const debounceUpdateFriend = useDebounce(updateFriend, 500);

  return (
    <View className="h-[60px] rounded-2xl bg-white w-full flex flex-row justify-between items-center px-4">
      <View className="flex flex-row gap-2 items-center">
        <View className="border-[1px] border-black200 w-[36px] h-[36px] rounded-xl">
          <Image source={{ uri: profilePhotoUrl }} className="w-full h-full rounded-xl" />
        </View>
        <Text className="text-black900 font-PTDLight text-sm">{profileName}</Text>
      </View>
      <TouchableOpacity
        onPress={debounceUpdateFriend}
        className={cn(
          friend ? 'bg-white border-[1px] border-black200' : 'bg-black900',
          'h-9 px-[12.5px] flex justify-center items-center rounded-xl',
        )}>
        <Text className={cn(friend ? 'text-black900' : 'text-white', 'text-sm font-PTDSemiBold')}>
          {friend ? `${t('myFriend.friend')}` : `${t('myFriend.addFriend')}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendItem;
