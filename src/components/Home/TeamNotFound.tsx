import React from 'react';
import { View } from 'react-native';
import Button from '@components/common/Button';
import PlusIcon from '@assets/icons/PlusIcon';
import AvatarHappyMsg from '@components/common/AvatarHappyMsg';
import useNavi from '@hooks/useNavi';

const TeamNotFound = () => {
  const { navigation } = useNavi();

  return (
    <View className="h-full flex flex-col items-center justify-center transform translate-y-[-120px]">
      <AvatarHappyMsg message={`오늘의 일상을 업로드하면\n친구들의 일상을 볼 수 있어요!`} />
      <View className="mt-[24px]">
        <Button onPress={() => navigation.navigate('TeamCreate')} size="mid" icon={<PlusIcon size={24} color="white" />}>
          모임 생성하기
        </Button>
      </View>
    </View>
  );
};

export default TeamNotFound;
