import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { usePostOneTeam } from '@hooks/query';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';
import DismissKeyboard from '@components/common/DismissKeyboard';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';

interface Form {
  title: string;
}

const TeamCreateScreen = () => {
  const { createTeamMutation } = usePostOneTeam();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = handleSubmit(async data => {
    const { title } = data;
    if (errors.title) return;
    createTeamMutation.mutate(title);
  });

  return (
    <DismissKeyboard>
      <View className="px-4 flex justify-between h-full">
        <View className="h-[122px] flex justify-center">
          <InputField
            label="모임 이름"
            name="title"
            control={control}
            rules={{
              required: '필수 입력 항목입니다',
              maxLength: { value: 20, message: '20자 이내로 설정해 주세요.' },
            }}
            errors={errors}
            placeholder="모임 이름을 입력해 주세요"
          />
        </View>
        <KeyboardAvoiding>
          <View className="absolute bottom-[-5px] pt-4 pb-[20px] w-full bg-white">
            <Button onPress={onSubmit} disabled={!!errors.title || createTeamMutation.isPending}>
              모임 생성하기
            </Button>
          </View>
        </KeyboardAvoiding>
      </View>
    </DismissKeyboard>
  );
};

export default TeamCreateScreen;
