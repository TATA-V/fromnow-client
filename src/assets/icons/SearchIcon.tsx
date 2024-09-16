import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const SearchIcon = ({ size = 24, color = '#1C1C1E' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M11.574 4.255a7.32 7.32 0 1 0 0 14.639 7.32 7.32 0 0 0 0-14.64ZM3 11.574a8.575 8.575 0 1 1 15.064 5.603l2.736 2.737a.626.626 0 0 1-.192 1.04.626.626 0 0 1-.694-.154l-2.737-2.736A8.575 8.575 0 0 1 3 11.574Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default SearchIcon;
