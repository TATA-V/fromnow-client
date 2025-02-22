import { cn } from '@utils/cn';
import React, { ReactNode, useMemo } from 'react';
import { Text, TouchableOpacity, View, StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';

type Color = 'black' | 'white' | 'yellow';

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
  size?: string;
  color?: Color;
  disabled?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  customStyle?: StyleProp<ViewStyle>;
}

const Button = ({ onPress, size = 'big', color = 'black', disabled = false, icon, customStyle, children, ...buttonProps }: Props) => {
  const btnSize = useMemo(() => {
    switch (size) {
      case 'big':
        return ['w-full', 'h-[48px]', 'rounded-2xl'];
      case 'mid':
        return ['w-[172px]', 'h-[48px]', 'rounded-2xl'];
      case 'small':
        return ['px-[15.5px]', 'h-[48px]', 'rounded-xl'];
      default:
        return ['w-full', 'h-[48px]', 'rounded-2xl'];
    }
  }, [size]);

  const btnColor = useMemo(() => {
    if (color === 'yellow') {
      return ['border-kakao', 'bg-kakao', 'text-kakaoTxt'];
    }
    if (disabled) {
      return color === 'black' ? ['border-black300', 'bg-black200', 'text-black500'] : ['border-black300', 'bg-white', 'text-black300'];
    }
    return color === 'black' ? ['border-black900', 'bg-black900', 'text-white'] : ['border-black200', 'bg-white', 'text-black900'];
  }, [color, disabled]);

  return (
    <TouchableOpacity
      style={customStyle}
      onPress={onPress}
      disabled={disabled}
      className={cn(btnSize.join(' '), btnColor[0], btnColor[1], 'border-[1px] flex justify-center items-center')}
      {...buttonProps}>
      <View className={cn(size === 'big' ? 'gap-[10px]' : 'gap-[8px]', 'flex flex-row justify-center items-center')}>
        <View>{icon && icon}</View>
        <Text className={cn(btnColor[2], 'font-PTDSemiBold text-sm')}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
