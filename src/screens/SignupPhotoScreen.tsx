import React from 'react';
import { View, Text } from 'react-native';
import Button from '@components/common/Button';
import Photo from '@components/Signup/Photo';
import useNavi from '@hooks/useNavi';

const SignupPhotoScreen = () => {
  const { navigation } = useNavi();

  return (
    <>
      <View className="px-5 pb-5 flex justify-between h-full">
        <View>
          <View className="h-[132px] flex flex-col justify-center">
            <Text className="font-UhBee text-black900 text-3xl">당신의 개성을 맘껏 뽐내보세요!</Text>
            <Text className="font-UhBee text-black900 text-3xl">나중에 등록해도 괜찮아요 :)</Text>
          </View>
          <View className="mt-[12px] flex items-center">
            <Photo />
          </View>
        </View>
        <Button onPress={() => navigation.navigate('Home')}>프롬나우 시작</Button>
      </View>
    </>
  );
};

export default SignupPhotoScreen;
