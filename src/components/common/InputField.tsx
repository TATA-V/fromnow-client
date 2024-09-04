import React from 'react';
import { Text } from 'react-native';
import Input from '@components/common/Input';
import { Control, RegisterOptions, Controller, FieldErrors } from 'react-hook-form';

interface Props {
  label: string;
  name: string;
  control: Control<any>;
  rules: RegisterOptions;
  errors: FieldErrors;
  placeholder: string;
}

const InputField = ({ label, name, control, rules, errors, placeholder }: Props) => {
  return (
    <>
      <Text className="default-label mb-3">{label}</Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => <Input placeholder={placeholder} value={value} setValue={onChange} />}
        name={name}
      />
      {errors[name] && <Text className="error-text mt-3">{typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}</Text>}
    </>
  );
};

export default InputField;
