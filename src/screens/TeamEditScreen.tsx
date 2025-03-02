import React from 'react';
import { View } from 'react-native';
import useCurrentRoute from '@hooks/useCurrentRoute';
import { useForm } from 'react-hook-form';
import { useUpdateOneTeam } from '@hooks/query';
import { useTranslation } from 'react-i18next';

import KeyboardAvoiding from '@components/common/KeyboardAvoiding';
import DismissKeyboard from '@components/common/DismissKeyboard';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';

interface Form {
  teamName: string;
}

interface Props {
  paramName: string;
}

const TeamEditScreen = ({}: Props) => {
  const { route } = useCurrentRoute();
  const { updateTeamMutation } = useUpdateOneTeam();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit = handleSubmit(async (data, e) => {
    const { teamName } = data;
    if (errors.teamName) return;
    updateTeamMutation.mutate({ diaryId: route.params.id, newTitle: teamName });
  });

  return (
    <DismissKeyboard>
      <View className="px-4 flex justify-between h-full">
        <View className="h-[122px] flex justify-center">
          <InputField
            label={t('team.name')}
            name="teamName"
            control={control}
            rules={{
              required: t('error.required'),
              maxLength: { value: 20, message: `${t('error.nickname')}` },
            }}
            errors={errors}
            placeholder={t('team.placeholder')}
          />
        </View>
        <KeyboardAvoiding>
          <View className="absolute bottom-[-5px] pt-4 pb-[20px] w-full bg-white">
            <Button onPress={onSubmit} disabled={!!errors.teamName || updateTeamMutation.isPending}>
              {t('teamEdit.finish')}
            </Button>
          </View>
        </KeyboardAvoiding>
      </View>
    </DismissKeyboard>
  );
};

export default TeamEditScreen;
