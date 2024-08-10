import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

type Color = 'black' | 'white';

interface Props {
  size?: string;
  color?: Color;
  disabled?: boolean;
  Icon?: FC<SvgProps>;
  children: ReactNode;
}

const Button = ({ size = 'big', color = 'black', disabled = false, Icon, children }: Props) => {
  const [btnSize, setBtnSize] = useState<string[]>(['w-full', 'h-[48px]', 'rounded-2xl']);
  const [btnColor, setBtnColor] = useState<string[]>(['border-black900', 'bg-black900', 'text-white']);

  useEffect(() => {
    let tempSize: string[] = [];
    switch (size) {
      case 'big':
        tempSize = ['w-full', 'h-[48px]', 'rounded-2xl'];
        break;
      case 'mid':
        tempSize = ['w-[172px]', 'h-[48px]', 'rounded-2xl'];
        break;
      case 'small':
        tempSize = ['px-[15.5px]', 'h-[48px]', 'rounded-xl'];
        break;
      default:
        tempSize = ['w-full', 'h-[48px]', 'rounded-2xl'];
    }
    setBtnSize(tempSize);

    let tempColor: string[] = [];
    if (disabled) {
      tempColor = color === 'black' ? ['border-black300', 'bg-black200', 'text-black500'] : ['border-black300', 'bg-white', 'text-black300'];
    }
    if (!disabled) {
      tempColor = color === 'black' ? ['border-black900', 'bg-black900', 'text-white'] : ['border-black200', 'bg-white', 'text-black900'];
    }
    setBtnColor(tempColor);
  }, [size, color, disabled]);

  return (
    <Pressable disabled={disabled} className={`${btnSize.join(' ')} ${btnColor[0]} ${btnColor[1]} border-[1px] flex justify-center items-center`}>
      <View className={`${size === 'big' ? 'gap-[10px]' : 'gap-[8px]'} flex flex-row justify-center items-center`}>
        {Icon && <Icon />}
        <Text className={`font-PTDSemiBold ${btnColor[2]} text-sm`}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
