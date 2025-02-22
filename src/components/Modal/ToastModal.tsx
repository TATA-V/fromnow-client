import { cn } from '@utils/cn';
import { MotiView } from 'moti';
import React, { useMemo, useState } from 'react';
import { View, Text, Modal } from 'react-native';

interface Props {
  type: 'success' | 'warn' | 'error';
  open: boolean;
  close: () => void;
  message: string;
}

const ToastModal = ({ type = 'success', open, close, message }: Props) => {
  if (!open) return null;

  const bgStyle = useMemo(() => {
    switch (type) {
      case 'success':
        return 'bg-[#E7F5EC] border-[#B0DDC1]';
      case 'warn':
        return 'bg-[#FFF8DB] border border-[#FEE987]';
      case 'error':
        return 'bg-[#FFEEEE] border border-[#FEC7C6]';
      default:
        return 'bg-[#FFEEEE] border border-[#B0DDC1]';
    }
  }, [type]);
  const textStyle = useMemo(() => {
    switch (type) {
      case 'success':
        return 'text-[#1C1C1E]';
      case 'warn':
        return 'text-[#FD7A00]';
      case 'error':
        return 'text-[#FF8A00]';
      default:
        return 'bg-[#1C1C1E]';
    }
  }, [type]);

  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const animateClose = () => setIsAnimatingOut(true);
  const onAnimationComplete = () => {
    setIsAnimatingOut(false);
    close();
  };

  return (
    <Modal
      transparent={true}
      onShow={() =>
        setTimeout(() => {
          animateClose();
        }, 2300)
      }>
      <MotiView
        from={{ translateY: -15, opacity: 0 }}
        animate={{ translateY: isAnimatingOut ? -15 : 0, opacity: isAnimatingOut ? 0 : 1 }}
        transition={{ type: 'timing', duration: 300 }}
        onDidAnimate={() => isAnimatingOut && onAnimationComplete()}
        style={{ position: 'absolute', top: 15, left: 0, right: 0, alignItems: 'center' }}>
        <View className={cn(bgStyle, 'rounded-[10px] border py-3 px-3')}>
          <Text className={cn(textStyle, 'text-[22px] font-UhBeeBold')}>{message}</Text>
        </View>
      </MotiView>
    </Modal>
  );
};

export default ToastModal;
