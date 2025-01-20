import { useCallback, useRef } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const funcRef = useRef(func);
  funcRef.current = func;

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      timeoutIdRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay],
  );

  return debounce;
};

export const useThrottle = <T extends (...args: any[]) => any>(func: T, delay: number): ((...args: Parameters<T>) => void) => {
  const throttlingRef = useRef(false);
  const funcRef = useRef(func);
  funcRef.current = func;

  const throttle = useCallback(
    (...args: Parameters<T>) => {
      if (!throttlingRef.current) {
        throttlingRef.current = true;
        funcRef.current(...args);

        setTimeout(() => {
          throttlingRef.current = false;
        }, delay);
      }
    },
    [delay],
  );

  return throttle;
};
