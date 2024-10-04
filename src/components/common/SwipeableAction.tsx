import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import TrashIcon from '@assets/icons/trash.svg';

interface Props {
  id: number;
  onDelete: (id: number) => void;
}

const DeleteButton = ({ id, onDelete }: Props) => {
  return (
    <View className="justify-center items-center w-28 h-full">
      <TouchableOpacity onPress={() => onDelete(id)} className="justify-center items-center h-full w-[50px]">
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteButton;
