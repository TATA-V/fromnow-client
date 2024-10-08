import React, { ReactNode } from 'react';
import { isIOS } from '@utils/deviceInfo';
import { KeyboardAvoidingView } from 'react-native';

interface Props {
  children: ReactNode;
  offset?: number;
}

const KeyboardAvoiding = ({ children, offset = 130 }: Props) => {
  return (
    <KeyboardAvoidingView className="relative" behavior={isIOS ? 'position' : 'height'} keyboardVerticalOffset={offset}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoiding;
