import React, { Dispatch, SetStateAction, useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { TeamFriend } from '@clientTypes/friend';

interface Props extends TeamFriend {
  index: number;
  length: number;
  setProfileNames: Dispatch<SetStateAction<string[]>>;
}

const TeamFriendItem = (props: Props) => {
  const { setProfileNames, profileName, profilePhotoUrl, team, index, length } = props;
  const [isFriend, setIsFriend] = useState(team);

  const addTeam = () => {
    if (isFriend) setProfileNames(prev => prev.filter(name => name !== profileName));
    else setProfileNames(prev => [...prev, profileName]);

    setIsFriend(!isFriend);
  };

  return (
    <View
      className={`${index === 0 && 'border-t-[1px] rounded-t-2xl'} ${index === length - 1 && 'border-b-[1px] rounded-b-2xl'}
      h-[60px] bg-white w-full flex flex-row justify-between items-center px-4 border-r-[1px] border-l-[1px] border-black200`}>
      <View className="flex flex-row gap-2 items-center">
        <View className="w-[36px] h-[36px] rounded-xl border-[1px] border-black200">
          <Image source={{ uri: profilePhotoUrl }} className="w-[36px] h-[36px] rounded-xl" />
        </View>
        <Text className="text-black900 font-PTDLight text-sm">{profileName}</Text>
      </View>
      <TouchableOpacity
        onPress={addTeam}
        className={`${isFriend ? 'bg-white border-[1px] border-black200' : 'bg-black900'}
        h-9 w-[74px] flex justify-center items-center rounded-xl`}>
        <Text className={`${isFriend ? 'text-black900' : 'text-white'} text-sm font-PTDSemiBold`}>{isFriend ? '모임' : '모임추가'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamFriendItem;
