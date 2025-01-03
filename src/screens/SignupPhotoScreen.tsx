import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '@components/common/Button';
import Photo from '@components/Signup/Photo';
import useNavi from '@hooks/useNavi';
import { useUpdatePhoto } from '@hooks/query';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { useDebounce } from '@hooks/useOptimization';
import useToast from '@hooks/useToast';

const SignupPhotoScreen = () => {
  const [image, setImage] = useState<ImageType>();
  const { navigation } = useNavi();
  const { successToast } = useToast();

  const { updatePhotoMutation } = useUpdatePhoto();

  const startFromNow = async () => {
    if (!image) {
      successToast('🎉 프롬나우에서 멋진 시간을 보내세요!');
      navigation.navigate('Bottom', { screen: 'Home' });
      return;
    }

    updatePhotoMutation.mutate(image);
  };

  const debounceStartFromNow = useDebounce(startFromNow, 500);

  return (
    <>
      <View className="px-4 pb-5 flex justify-between h-full">
        <View>
          <View className="h-[132px] flex flex-col justify-center">
            <Text className="font-UhBee text-black900 text-3xl">당신의 개성을 맘껏 뽐내보세요!</Text>
            <Text className="font-UhBee text-black900 text-3xl">나중에 등록해도 괜찮아요 :)</Text>
          </View>
          <View className="mt-[12px] flex items-center">
            <Photo image={image} setImage={setImage} />
          </View>
        </View>
      </View>
      <View className="absolute bottom-[20px] px-4 w-full">
        <Button onPress={debounceStartFromNow}>프롬나우 시작</Button>
      </View>
    </>
  );
};

export default SignupPhotoScreen;
