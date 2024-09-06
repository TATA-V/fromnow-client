import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
}

const PeopleIcon = ({ color = '#1C1C1E' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none">
      <Path
        fill={color}
        d="M12 13c2.396 0 4.575.694 6.178 1.672.8.488 1.484 1.064 1.978 1.69.486.615.844 1.351.844 2.138 0 .845-.411 1.511-1.003 1.986-.56.45-1.299.748-2.084.956-1.578.417-3.684.558-5.913.558s-4.335-.14-5.913-.558c-.785-.208-1.524-.506-2.084-.956C3.41 20.01 3 19.345 3 18.5c0-.787.358-1.523.844-2.139.494-.625 1.177-1.2 1.978-1.69C7.425 13.695 9.605 13 12 13Zm0-11a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
      />
    </Svg>
  );
};

export default PeopleIcon;
