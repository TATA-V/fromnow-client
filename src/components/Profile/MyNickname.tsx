import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import PenIcon from '@assets/icons/pen.svg';
import { useUpdateNickname } from '@hooks/query';

const MyNickname = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState('채순');
  const { updateNicknameMutation } = useUpdateNickname();

  const submitNickname = () => {
    updateNicknameMutation.mutate(nickname);
    setIsEditing(false);
  };

  return (
    <View className="flex flex-row mt-[8px] items-center">
      {isEditing && (
        <TextInput
          value={nickname}
          onChangeText={setNickname}
          onSubmitEditing={submitNickname}
          className="text-black900 font-UhBee text-3xl"
          blurOnSubmit={false}
          autoFocus
        />
      )}
      {!isEditing && (
        <>
          <Text className="text-black900 font-UhBee text-3xl">{nickname}</Text>
          <TouchableOpacity className="ml-[3px]" onPress={() => setIsEditing(true)}>
            <PenIcon />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default MyNickname;
