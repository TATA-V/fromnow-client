import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { usePostOneTeam } from '@hooks/query';
import { useTranslation } from 'react-i18next';
import InputField from '@components/common/InputField';
import Button from '@components/common/Button';
import DismissKeyboard from '@components/common/DismissKeyboard';
import KeyboardAvoiding from '@components/common/KeyboardAvoiding';

interface Form {
  title: string;
}

const TeamCreateScreen = () => {
  const { createTeamMutation } = usePostOneTeam();
  const { t } = useTranslation();

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
            label={t('team.name')}
            name="title"
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
            <Button onPress={onSubmit} disabled={!!errors.title || createTeamMutation.isPending}>
              {t('teamCreate.create')}
            </Button>
          </View>
        </KeyboardAvoiding>
      </View>
    </DismissKeyboard>
  );
};

export default TeamCreateScreen;
