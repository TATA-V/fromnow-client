import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
}

const PenIcon = ({ size = 20 }: Props) => {
  return (
    <Svg viewBox="0 0 20 20" width={size} height={size} fill="none">
      <Path
        fill="#D9D9DC"
        d="m8.963 5.14 5.891 5.893-5.977 5.978a1.666 1.666 0 0 1-1.032.482l-.146.005H3.338a.842.842 0 0 1-.837-.75l-.005-.091v-4.361c0-.391.138-.77.39-1.07l.1-.109L8.962 5.14Zm2.616-2.617a1.667 1.667 0 0 1 2.251-.097l.106.097 3.536 3.536a1.666 1.666 0 0 1 .097 2.25l-.097.107-1.438 1.438-5.892-5.892 1.437-1.439Z"
      />
    </Svg>
  );
};

export default PenIcon;
