import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { usePostOneTeam } from '@hooks/query';
import useNavi from '@hooks/useNavi';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';

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
    <View className="px-4 pb-5 flex justify-between h-full">
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
      <Button onPress={onSubmit} disabled={!!errors.title}>
        모임 생성하기
      </Button>
    </View>
  );
};

export default TeamCreateScreen;
