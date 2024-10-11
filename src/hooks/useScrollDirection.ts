import { useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export const useScrollDirection = () => {
  const [isScrollUp, setIsScrollUp] = useState(true);
  const lastOffsetY = useRef(0);

  const scrollList = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffsetY = e.nativeEvent.contentOffset.y;
    const layoutHeight = e.nativeEvent.layoutMeasurement.height;
    const totalContentHeight = e.nativeEvent.contentSize.height;

    // 스크롤이 처음일 때
    if (currentOffsetY <= 16) {
      setIsScrollUp(true);
      return;
    }
    // 스크롤이 맨 아래에 도달했을 때
    if (currentOffsetY + layoutHeight >= totalContentHeight) {
      setIsScrollUp(false);
      return;
    }
    // 스크롤이 내려가고 있을 때
    if (isScrollUp && currentOffsetY > lastOffsetY.current) {
      setIsScrollUp(false);
    }
    // 스크롤이 올라가고 있을 때
    if (!isScrollUp && currentOffsetY < lastOffsetY.current) {
      setIsScrollUp(true);
    }

    lastOffsetY.current = currentOffsetY;
  };

  return {
    isScrollUp,
    setIsScrollUp,
    scrollList,
  };
};
