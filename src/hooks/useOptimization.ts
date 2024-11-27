import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );

  return debounce;
};

export const useThrottle = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  const throttlingRef = useRef(false);

  const throttle = useCallback(
    (...args: Parameters<T>) => {
      if (!throttlingRef.current) {
        throttlingRef.current = true;
        func(...args);

        setTimeout(() => {
          throttlingRef.current = false;
        }, delay);
      }
    },
    [func, delay],
  );

  return throttle;
};
