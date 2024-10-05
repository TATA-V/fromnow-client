import React, { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const RightArrowIcon = ({ size = 24, color = '#1C1C1E' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M16.762 19.82a.75.75 0 0 1-.08-1.057l5.58-6.512-5.58-6.512a.75.75 0 1 1 1.138-.976l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.058.08"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default RightArrowIcon;
