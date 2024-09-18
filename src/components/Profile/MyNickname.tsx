import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import PenIcon from '@assets/icons/PenIcon';
import { useUpdateNickname } from '@hooks/query';

interface Props {
  profileName: string;
}

const MyNickname = ({ profileName }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(profileName);
  const { updateNicknameMutation } = useUpdateNickname(setNickname);

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
          onBlur={submitNickname}
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
