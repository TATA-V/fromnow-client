import React from 'react';
import Svg, { Rect } from 'react-native-svg';

interface Props {
  color?: string;
}

const CameraBtn = ({ color = '#fff' }: Props) => {
  return (
    <Svg viewBox="0 0 61 61" width={61} height={61} fill="none">
      <Rect width={56} height={56} x={2.5} y={2.5} stroke={color} strokeWidth={4} rx={28} />
      <Rect width={46} height={46} x={7.5} y={7.5} fill={color} rx={23} />
    </Svg>
  );
};

export default CameraBtn;
