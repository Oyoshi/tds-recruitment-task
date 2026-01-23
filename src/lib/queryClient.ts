import { QueryClient } from '@tanstack/react-query';

export const CACHE_TIMES = {
  CURRENCIES: 1000 * 60 * 60, // 1 hour
  GC_CURRENCIES: 1000 * 60 * 60 * 24, // 24 hours
  CONVERSION: 1000 * 60 * 5, // 5 minutes
  DEFAULT_STALE: 1000 * 60 * 2, // 2 minutes
} as const;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIMES.DEFAULT_STALE,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
