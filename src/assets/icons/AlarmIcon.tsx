import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
}

const AlarmIcon = ({ color = '#fff' }: Props) => {
  return (
    <Svg viewBox="0 0 24 24" width={24} height={24} fill="none">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M12 22c4.835 0 8.756-3.884 8.756-8.675 0-4.79-3.92-8.674-8.757-8.674s-8.757 3.883-8.757 8.674C3.242 18.116 7.162 22 12 22Zm0-13.253c.402 0 .73.324.73.723v3.556l2.217 2.198a.72.72 0 0 1 0 1.022.735.735 0 0 1-1.032 0l-2.432-2.41a.72.72 0 0 1-.214-.51V9.47c0-.4.327-.723.73-.723ZM8.24 2.34a.72.72 0 0 1-.233.996l-3.89 2.41a.734.734 0 0 1-1.007-.23.72.72 0 0 1 .232-.996l3.892-2.41a.734.734 0 0 1 1.006.23m7.52 0a.734.734 0 0 1 1.004-.23l3.892 2.41a.72.72 0 0 1-.223 1.318.734.734 0 0 1-.55-.092l-3.892-2.41a.72.72 0 0 1-.233-.996"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default AlarmIcon;
