import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import PenIcon from '@assets/icons/PenIcon';
import { useUpdateNickname } from '@hooks/query';
import useToast from '@hooks/useToast';
import { nicknameRegex } from '@const/regex';
import { useDebounce } from '@hooks/useOptimization';

interface Props {
  profileName: string;
}

const MyNickname = ({ profileName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(profileName);
  const { updateNicknameMutation } = useUpdateNickname();
  const { warnToast } = useToast();

  const submitNickname = () => {
    if (!nicknameRegex.test(nickname)) {
      warnToast('2~10자 한/영/숫자로 설정해 주세요');
      return;
    }
    updateNicknameMutation.mutate(nickname);
    setIsEditing(false);
  };

  const debounceSubmitNickname = useDebounce(submitNickname, 500);

  return (
    <View className="flex flex-row mt-[8px] items-center">
      {isEditing && (
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          onSubmitEditing={debounceSubmitNickname}
          className="text-black900 font-UhBee text-3xl"
          blurOnSubmit={false}
          onBlur={() => {
            setNickname(profileName);
            setIsEditing(false);
          }}
          autoFocus
        />
      )}
      {!isEditing && (
        <>
          <Text className="text-black900 font-UhBee text-3xl">{profileName}</Text>
          <TouchableOpacity className="ml-[3px]" onPress={() => setIsEditing(true)}>
            <PenIcon />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MyNickname;
