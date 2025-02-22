import React, { ReactNode } from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps, Keyboard } from 'react-native';

interface Props extends TouchableWithoutFeedbackProps {
  children: ReactNode;
}

const DismissKeyboard = ({ children, ...props }: Props) => {
  return (
    <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss} {...props}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
