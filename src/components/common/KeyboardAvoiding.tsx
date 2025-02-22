import React, { ReactNode } from 'react';
import { isIOS } from '@utils/deviceInfo';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps } from 'react-native';

interface Props extends KeyboardAvoidingViewProps {
  children: ReactNode;
  offset?: number;
}

const KeyboardAvoiding = ({ children, offset = 130, ...props }: Props) => {
  return (
    <KeyboardAvoidingView className="relative" behavior={isIOS ? 'padding' : 'height'} keyboardVerticalOffset={offset} {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
