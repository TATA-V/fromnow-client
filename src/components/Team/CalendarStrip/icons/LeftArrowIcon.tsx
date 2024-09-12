import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
}

const LeftArrowIcon = ({ color = '#1C1C1E' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M7.237 4.43a.75.75 0 0 1 .081 1.057L1.738 12l5.58 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.08"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default LeftArrowIcon;
