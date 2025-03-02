import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from '@components/common/Button';
import Photo from '@components/Signup/Photo';
import useNavi from '@hooks/useNavi';
import { useUpdatePhoto } from '@hooks/query';
import { Image as ImageType } from 'react-native-image-crop-picker';
import { useDebounce } from '@hooks/useOptimization';
import useToast from '@hooks/useToast';
import { useTranslation } from 'react-i18next';

const SignupPhotoScreen = () => {
  const [image, setImage] = useState<ImageType>();
  const { navigation } = useNavi();
  const { successToast } = useToast();
  const { t } = useTranslation();

  const { updatePhotoMutation } = useUpdatePhoto();

  const startFromNow = async () => {
    if (!image) {
      successToast(`${t('toast.signup.welcome')}`);
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
            <Text className="font-UhBee text-black900 text-3xl">{t('signupPhoto.title1')}</Text>
            <Text className="font-UhBee text-black900 text-3xl">{t('signupPhoto.title2')}</Text>
          </View>
          <View className="mt-[12px] flex items-center">
            <Photo image={image} setImage={setImage} />
          </View>
        </View>
      </View>
      <View className="absolute bottom-[20px] px-4 w-full">
        <Button onPress={debounceStartFromNow}>{t('signupPhoto.start')}</Button>
      </View>
    </>
  );
};

export default SignupPhotoScreen;
