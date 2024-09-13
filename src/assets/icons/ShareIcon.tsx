import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ShareIcon = ({ size = 24, color = '#fff' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M15 5.5a3.5 3.5 0 1 1 .994 2.443L11.67 10.21c.213.555.33 1.16.33 1.79 0 .612-.111 1.219-.33 1.79l4.324 2.267a3.5 3.5 0 1 1-.93 1.771l-4.475-2.346a5 5 0 1 1 0-6.963l4.475-2.347A3.517 3.517 0 0 1 15 5.5Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default ShareIcon;
