import React from 'react';
import { Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';
import { useUpdateNickname } from '@hooks/query';

interface FormValues {
  nickname: string;
}

const SignupNicknameScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { navigation } = useNavi();
  const { updateNicknameMutation } = useUpdateNickname();

  const onSubmit = handleSubmit(async data => {
    const { nickname } = data;
    if (errors.nickname) return;
    updateNicknameMutation.mutate(nickname);
  });

  return (
    <>
      <View className="px-5 pb-5 flex justify-between h-full">
        <View>
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
                pattern: { value: /^[가-힣a-zA-Z0-9]{2,10}$/, message: '2~10자 한/영/숫자로 설정해 주세요' },
              }}
              errors={errors}
              placeholder="당신만의 특별한 별명을 입력해 주세요"
            />
          </View>
        </View>
        <Button onPress={onSubmit} disabled={!!errors.nickname}>
          다음
        </Button>
      </View>
    </>
  );
};

export default SignupNicknameScreen;
