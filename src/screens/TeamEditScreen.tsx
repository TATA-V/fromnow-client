import React from 'react';
import { View } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { useForm } from 'react-hook-form';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';
import useNavi from '@hooks/useNavi';
import { useUpdateOneTeam } from '@hooks/query';

interface Form {
  teamName: string;
}

interface Props {
  paramName: string;
}

const TeamEditScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  const { updateTeamMutation } = useUpdateOneTeam();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = handleSubmit(async data => {
    const { teamName } = data;
    console.log('teamName:', teamName);
    if (errors.teamName) return;
    updateTeamMutation.mutate({ diaryId: route.params.id, newTitle: teamName });
    // navigation.navigate('TeamSetting', { id: route.params.id });
  });

  return (
    <View className="px-4 pb-5 flex justify-between h-full">
      <View className="h-[122px] flex justify-center">
        <InputField
          label="모임 이름"
          name="teamName"
          control={control}
          rules={{
            required: '필수 입력 항목입니다',
            maxLength: { value: 20, message: '20자 이내로 설정해 주세요.' },
          }}
          errors={errors}
          placeholder="모임 이름을 입력해 주세요"
        />
      </View>
      <Button onPress={onSubmit} disabled={!!errors.teamName}>
        수정 완료하기
      </Button>
    </View>
  );
};

export default TeamEditScreen;
