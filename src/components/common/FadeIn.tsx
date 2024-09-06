import { MotiView } from 'moti';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FadeIn = ({ children }: Props) => {
  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 250 }}>
      {children}
    </MotiView>
  );
};

export default FadeIn;
