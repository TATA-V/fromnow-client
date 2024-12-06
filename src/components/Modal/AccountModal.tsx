import React, { useState } from 'react';
import { Text, TouchableOpacity, Modal, View } from 'react-native';
import { MotiView } from 'moti';
import { useModal, ModalState, useToastModal } from '@components/Modal';
import Input from '@components/common/Input';
import useUserStore from '@store/useUserStore';
import { useDeleteUser } from '@hooks/query';
import { useDebounce } from '@hooks/useOptimization';

const AccountModal = (props: ModalState) => {
  const { open, title, description, lockBackdrop } = props;
  const { hideModal } = useModal();
  const { showToastModal } = useToastModal();
  const [nickname, setNickname] = useState('');
  const name = useUserStore(state => state.name);
  const { deleteUserMutation } = useDeleteUser();

  const confirmClick = () => {
    if (nickname.trim().length === 0) {
      showToastModal({ type: 'warn', message: '닉네임을 입력해 주세요.' });
      return;
    }
    if (nickname.trim() !== name) {
      showToastModal({ type: 'warn', message: '닉네임을 정확히 입력해 주세요.' });
      return;
    }
    deleteUserMutation.mutate(name, {
      onSuccess: () => {
        hideModal();
        setNickname('');
      },
    });
  };
  const debounceConfirmClick = useDebounce(confirmClick, 500);

  return (
    <Modal transparent visible={open} animationType="fade" onRequestClose={hideModal}>
      <View onTouchEnd={lockBackdrop ? undefined : hideModal} className="flex-1 justify-center items-center bg-black/50">
        <MotiView
          onTouchEnd={e => e.stopPropagation()}
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
          transition={{ type: 'timing', duration: 300 }}
          className="w-[279px] p-4 bg-white rounded-[24px] items-center">
          {title && <Text className="font-PTDSemiBold text-lg mb-5 text-black900 mt-2 text-center leading-[26px]">{title}</Text>}
          {description && <Text className="text-black900 text-sm font-PTDLight text-center">{description}</Text>}
          <View className="w-full pt-4">
            <Text className="text-fnRed text-sm text-center mb-2 font-PTDLight">계정을 삭제하려면 닉네임을 입력해 주세요.</Text>
            <Input value={nickname} setValue={setNickname} autoFocus placeholder="닉네임 입력" />
          </View>
          <View className="flex-row w-full justify-between mt-[24px]">
            <TouchableOpacity
              onPress={hideModal}
              className="w-[121.5px] border-[1px] border-[#E4E5EA] rounded-xl h-[40px] justify-center items-center">
              <Text className="font-semibold text-sm text-black900 font-PTDSemiBold">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={debounceConfirmClick} className="w-[121.5px] bg-black900 rounded-xl h-[40px] justify-center items-center">
              <Text className="text-white font-semibold text-sm font-PTDSemiBold">확인</Text>
            </TouchableOpacity>
          </View>
        </MotiView>
      </View>
    </Modal>
  );
};

export default AccountModal;
