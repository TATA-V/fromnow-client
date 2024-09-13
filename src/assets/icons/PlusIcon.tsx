import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const PlusIcon = ({ size = 25, color = '#1C1C1E' }: Props) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 25 25">
      <Path
        fill={color}
        d="M13.25 5.477a.75.75 0 1 0-1.5 0v6.25H5.5a.75.75 0 1 0 0 1.5h6.25v6.25a.75.75 0 0 0 1.5 0v-6.25h6.25a.75.75 0 0 0 0-1.5h-6.25v-6.25Z"
      />
    </Svg>
  );
};
export default PlusIcon;
