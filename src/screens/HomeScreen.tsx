import React, { useEffect, useRef, useState } from 'react';
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import useNavi from '@hooks/useNavi';
import { isWeb } from '@utils/deviceInfo';
import { useLocation } from 'react-router-dom';
import { issueAccessTokenWithCodeWeb } from '@react-native-kakao/user';
import { CLIENT_URL } from '@env';
import GoogleIcon from '@assets/icons/google.svg';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

const HomeScreen = () => {
  const { navigate, navigation } = useNavi();

  const goToLogin = () => {
    if (isWeb && navigate) {
      navigate('/signin');
      return;
    }
    if (navigation) {
      navigation.navigate('SignIn');
    }
  };

  // kakao web 로그인
  const location = isWeb ? useLocation() : { search: '' };
  const [kakaoWebIdToken, setKakaoWebIdToken] = useState('');
  const accessTokenIssued = useRef(false);
  useEffect(() => {
    if (!isWeb) return;
    const code = new URLSearchParams(location.search).get('code');
    if (!code) return;
    const fetchAccessToken = async () => {
      if (!code || accessTokenIssued.current) return;

      try {
        const { idToken } = await issueAccessTokenWithCodeWeb({
          code,
          redirectUri: CLIENT_URL,
        });
        setKakaoWebIdToken(idToken);
        accessTokenIssued.current = true;
      } catch (error) {
        console.error('Failed to issue token:', error);
      }
    };

    fetchAccessToken();
  }, [location.search]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <StatusBar barStyle={'light-content'} backgroundColor={'#fff'} />
      <Pressable onPress={goToLogin} className="bg-green-300 p-4 text-green-900 m-10 border border-solid border-green-900 rounded">
        <Text className="font-UhBee">Go To SignIn</Text>
      </Pressable>
      <View className="flex flex-col gap-5 mb-5">
        <View className="px-5">
          <Button color="black" disabled Icon={GoogleIcon}>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
