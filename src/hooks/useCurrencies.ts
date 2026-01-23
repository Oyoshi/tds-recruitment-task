import { CACHE_TIMES } from '@/lib/constants';
import { FXService } from '@/services/FXService';
import { useQuery } from '@tanstack/react-query';

const fxService = new FXService(
  import.meta.env.VITE_CURRENCY_BEACON_API_KEY || ''
);

/**
 *  I decided to use TanStack Query instead of manual useEffect/fetch because of time limitations for the task:
 * - Automatically cancels "zombie" requests via AbortController to prevent race conditions.
 * - Provides built-in caching and deduplication (avoids redundant API calls).
 * - Manages complex server state (loading/error/stale states) out of the box.
 * - Implements SWR (Stale-While-Revalidate) to keep the UI snappy and data fresh.
 */
export const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: () => fxService.fetchCurrencies(),
    staleTime: CACHE_TIMES.CURRENCIES,
    gcTime: CACHE_TIMES.GC_CURRENCIES,
  });
};

export const useConversion = (from: string, to: string, amount: number) => {
  return useQuery({
    queryKey: ['convert', from, to, amount],
    queryFn: () => {
      if (from === to) {
        return Promise.resolve({ value: amount });
      }
      return fxService.convert(from, to, amount);
    },
    enabled: !!from && !!to && amount > 0,
    staleTime: CACHE_TIMES.CONVERSION,
  });
};
