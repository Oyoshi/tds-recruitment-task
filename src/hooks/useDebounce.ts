import { useState, useEffect } from 'react';

/**
 * Custom debounce hook to limit the frequency of state updates and API calls.
 * Implementation avoids heavy external libraries (like Lodash) because the implementation is straightforward
 * (not as like for then tanstack query mechanisms).
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);
  return debouncedValue;
}
