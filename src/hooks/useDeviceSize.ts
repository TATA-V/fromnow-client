import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useDeviceSize = () => {
  const { width, height } = Dimensions.get('window');
  const [dimensions, setDimensions] = useState({
    width,
    height,
    isTablet: width >= 768,
  });

  useEffect(() => {
    const onChange = ({ window }: { window: { width: number; height: number } }) => {
      const { width: newWidth, height: newHeight } = window;
      setDimensions({ width: newWidth, height: newHeight, isTablet: newWidth >= 768 });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
    isTablet: dimensions.isTablet,
  };
};

export default useDeviceSize;
