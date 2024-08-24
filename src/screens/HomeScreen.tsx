import React from 'react';
import { Pressable, Text, View } from 'react-native';
import useNavi from '@hooks/useNavi';
import GoogleIcon from '@assets/icons/google.svg';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import { Alert } from 'react-native';

const HomeScreen = () => {
  const { navigation } = useNavi();

  const goToLogin = () => {
    if (navigation) {
      navigation.navigate('SignIn');
    }
  };

  return (
    <>
      <Pressable onPress={goToLogin} className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text className="font-UhBee">Go To SignIn</Text>
      </Pressable>
      <View className="flex flex-col gap-5 mb-5">
        <View className="px-5">
          <Button onPress={() => Alert.alert('로그인 세션 만료')} color="white" Icon={GoogleIcon}>
            button
          </Button>
        </View>
        <View className="px-5">
          <Button size="mid" color="white">
            button
          </Button>
        </View>
      </View>
      <View className="px-5 flex flex-col gap-5">
        <View>
          <Input placeholder="input" search />
        </View>
        <View>
          <Input placeholder="input" />
        </View>
        <View>
          <Input placeholder="input" editable={false} />
        </View>
        <View>
          <Input placeholder="input" mode="error" />
        </View>
        <View>
          <Input placeholder="input" mode="trust" />
        </View>
      </View>
    </>
  );
};

export default HomeScreen;
