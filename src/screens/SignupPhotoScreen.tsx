import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@components/common/Button';
import Header from '@components/Signup/Header';
import Photo from '@components/Signup/Photo';
import useNavi from '@hooks/useNavi';

const SignupPhotoScreen = () => {
  const { navigation } = useNavi();

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View className="px-5 pb-5 flex justify-between h-full">
        <View className="pt-[66px]">
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
      <Header />
    </SafeAreaView>
  );
};

export default SignupPhotoScreen;
