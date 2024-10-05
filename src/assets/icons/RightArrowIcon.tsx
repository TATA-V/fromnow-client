import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const RightArrowIcon = ({ size = 16, color = '#E4E5EA' }: Props) => {
  return (
    <Svg viewBox="0 0 16 16" width={size} height={size} fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M5.675 2.953a.5.5 0 0 1 .704.055l4 4.667a.5.5 0 0 1 0 .65l-4 4.667a.5.5 0 0 1-.758-.65L9.34 8l-3.72-4.341a.5.5 0 0 1 .053-.705"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default RightArrowIcon;
