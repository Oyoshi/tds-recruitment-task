import { CACHE_TIMES } from '@/lib/constants';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_TIMES.DEFAULT_STALE,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
