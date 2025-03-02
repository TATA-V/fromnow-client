import React from 'react';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';
import { useUpdateNickname } from '@hooks/query';
import DismissKeyboard from '@components/common/DismissKeyboard';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';
import { nicknameRegex } from '@const/regex';
import { useTranslation } from 'react-i18next';

interface Form {
  nickname: string;
}

const SignupNicknameScreen = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const { updateNicknameMutation } = useUpdateNickname();
  const { t } = useTranslation();

  const onSubmit = handleSubmit(async data => {
    const { nickname } = data;
    if (errors.nickname) return;
    updateNicknameMutation.mutate(nickname, {
      onSuccess: () => {
        reset({ nickname: '' });
      },
    });
  });

  return (
    <DismissKeyboard>
      <View className="px-4 flex justify-between h-full">
        <View className="pb-5">
          <View className="h-[132px] flex flex-col justify-center">
            <Text className="font-UhBee text-black900 text-3xl">{t('signupNickname.title1')}</Text>
            <Text className="font-UhBee text-black900 text-3xl">{t('signupNickname.title2')}</Text>
          </View>
          <View className="h-[122px] flex flex-col justify-center">
            <InputField
              label={t('signupNickname.inputLabel')}
              name="nickname"
              control={control}
              rules={{
                required: `${t('error.required')}`,
                pattern: { value: nicknameRegex, message: `${t('error.nickname')}` },
              }}
              errors={errors}
              placeholder={t('signupNickname.inputPlaceholder')}
            />
          </View>
        </View>
        <KeyboardAvoiding>
          <View className="absolute bottom-[20px] w-full">
            <Button onPress={onSubmit} disabled={!!errors.nickname || updateNicknameMutation.isPending}>
              {t('base.next')}
            </Button>
          </View>
        </KeyboardAvoiding>
      </View>
    </DismissKeyboard>
  );
};

export default SignupNicknameScreen;
