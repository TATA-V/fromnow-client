import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
}

const HomeIcon = ({ color = '#1C1C1E' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none">
      <Path
        fill={color}
        d="M13.2 2.65a2 2 0 0 0-2.4 0l-7 5.25A2 2 0 0 0 3 9.5V19a2 2 0 0 0 2 2h3.9a1.1 1.1 0 0 0 1.1-1.1V15a2 2 0 0 1 4 0v4.9a1.1 1.1 0 0 0 1.1 1.1H19a2 2 0 0 0 2-2V9.5a2 2 0 0 0-.8-1.6l-7-5.25Z"
      />
    </Svg>
  );
};

export default HomeIcon;
