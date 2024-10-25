import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share, Modal, Dimensions } from 'react-native';
import TeamSettingHeader from '@components/TeamSetting/TeamSettingHeader';
import useCurrentRoute from '@hooks/useCurrentRoute';
import PlusIcon from '@assets/icons/PlusIcon';
import FriendItem from '@components/TeamSetting/FriendItem';
import PenIcon from '@assets/icons/PenIcon';
import ShareIcon from '@assets/icons/ShareIcon';
import TrashIcon from '@assets/icons/trash.svg';
import { CLIENT_URL } from '@env';
import useNavi from '@hooks/useNavi';
import { useModal } from '@components/Modal';
import { useDeleteOneTeam, useGetTeamMenu } from '@hooks/query';
import useSelectedTeamStore from '@store/useSelectedTeamStore';
import { MotiView } from 'moti';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const { width } = Dimensions.get('window');

const TeamSettingDrawer = ({ open, setOpen }: Props) => {
  const { navigation } = useNavi();
  const { route } = useCurrentRoute();
  const { showModal } = useModal();
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const teamId = useSelectedTeamStore(state => state.id);
  const { data } = useGetTeamMenu(teamId);

  const close = () => setIsAnimatingOut(true);
  const onAnimationComplete = () => {
    setIsAnimatingOut(false);
    setOpen(false);
  };

  const { deleteTeamMutation } = useDeleteOneTeam(close, true);
  const deleteTeam = () => {
    const confirmDeleteTeam = () => {
      deleteTeamMutation.mutate(route.params.id);
    };
    showModal({
      type: 'dialog',
      title: '모임 삭제',
      description: '모임을 삭제하시겠습니까?\n삭제하면 다시 복구할 수 없습니다.',
      confirm: confirmDeleteTeam,
    });
  };

  const settingList = [
    {
      icon: <PenIcon size={24} />,
      title: '모임정보 수정하기',
      onPress: () => {
        close();
        navigation.navigate('TeamEdit', { id: route.params.id });
      },
    },
    {
      icon: <ShareIcon size={24} color="#E4E5EA" />,
      title: '초대링크 공유하기',
      onPress: async () => await Share.share({ message: `${CLIENT_URL}TeamSetting/${route.params.id}` }),
    },
    { icon: <TrashIcon />, title: '모임 삭제하기', onPress: deleteTeam },
  ];

  return (
    <Modal transparent visible={open} onRequestClose={close}>
      <MotiView animate={{ opacity: isAnimatingOut ? 0 : 1 }} onTouchEnd={close} className="flex-1 justify-center items-center pl-10 bg-black/50">
        <MotiView
          onTouchEnd={e => e.stopPropagation()}
          className="w-full flex-1"
          from={{ translateX: width }}
          animate={{ translateX: isAnimatingOut ? width : 0 }}
          exit={{ translateX: width }}
          transition={{ type: 'timing', duration: 300 }}
          onDidAnimate={() => isAnimatingOut && onAnimationComplete()}>
          <ScrollView className="flex-1 px-4 bg-white" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View className="h-[26px] mt-[66px] justify-center">
              <Text className="font-PTDLight text-sm text-black500">모임 친구</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                close();
                navigation.navigate('TeamFriendAdd', { id: route.params.id });
              }}
              className="h-[60px] flex-row space-x-[8px] items-center">
              <View className="w-[48px] h-[48px] rounded-2xl border-[1px] border-black200 bg-black100 justify-center items-center">
                <PlusIcon size={24} />
              </View>
              <Text className="text-black900 text-sm font-PTDLight">친구 추가하기</Text>
            </TouchableOpacity>
            {data?.map((item, index) => (
              <FriendItem {...item} key={index} />
            ))}
            <View className="mt-[12px] mb-[30px]">
              {settingList.map(({ icon, title, onPress }, index) => (
                <TouchableOpacity
                  onPress={onPress}
                  key={index}
                  className={`flex-row space-x-[6px] h-[48px] items-center border-t-[1px] border-black100
                  ${index === settingList.length - 1 && 'border-b-[1px]'}`}>
                  {icon}
                  <Text className="text-black700 text-sm font-PTDLight">{title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <TeamSettingHeader close={close} />
        </MotiView>
      </MotiView>
    </Modal>
  );
};
export default TeamSettingDrawer;
