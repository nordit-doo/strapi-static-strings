import { useEffect, useState } from 'react';

/**
 * useDebounce hook
 * @param {string} value - Value to be debounced
 * @param {number} delay - Delay in milliseconds
 */
export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
