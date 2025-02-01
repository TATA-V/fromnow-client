import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';
import { useUpdateNickname } from '@hooks/query';
import DismissKeyboard from '@components/common/DismissKeyboard';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';
import { nicknameRegex } from '@const/regex';

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
            <Text className="font-UhBee text-black900 text-3xl">정말 반가워요!</Text>
            <Text className="font-UhBee text-black900 text-3xl">프롬나우가 어떻게 불러드릴까요?</Text>
          </View>
          <View className="h-[122px] flex flex-col justify-center">
            <InputField
              label="별명"
              name="nickname"
              control={control}
              rules={{
                required: '필수 입력 항목입니다',
                pattern: { value: nicknameRegex, message: '2~10자 한/영/숫자로 설정해 주세요' },
              }}
              errors={errors}
              placeholder="당신만의 특별한 별명을 입력해 주세요"
            />
          </View>
        </View>
        <KeyboardAvoiding>
          <View className="absolute bottom-[20px] w-full">
            <Button onPress={onSubmit} disabled={!!errors.nickname || updateNicknameMutation.isPending}>
              다음
            </Button>
          </View>
        </KeyboardAvoiding>
      </View>
    </DismissKeyboard>
  );
};

export default SignupNicknameScreen;
