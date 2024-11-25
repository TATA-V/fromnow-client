import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

const BellIcon = ({ width = 24, height = 25, color = '#1C1C1E' }: Props) => {
  return (
    <Svg width={width} height={height + 1} fill="none" viewBox="0 0 24 25">
      <Path
        fill={color}
        d="M8.352 20.719A4.63 4.63 0 0 0 12 22.477a4.63 4.63 0 0 0 3.648-1.758 27.205 27.205 0 0 1-7.296 0ZM18.75 9.477v.704c0 .845.24 1.67.692 2.374l1.108 1.723c1.011 1.574.24 3.713-1.52 4.21a25.801 25.801 0 0 1-14.06 0c-1.759-.497-2.53-2.636-1.52-4.21l1.108-1.723a4.4 4.4 0 0 0 .693-2.374v-.704c0-3.866 3.022-7 6.75-7 3.726 0 6.75 3.134 6.75 7Z"
      />
    </Svg>
  );
};

export default BellIcon;
