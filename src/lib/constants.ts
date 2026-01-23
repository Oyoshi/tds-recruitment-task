export const CACHE_TIMES = {
  CURRENCIES: 1000 * 60 * 60, // 1 hour
  GC_CURRENCIES: 1000 * 60 * 60 * 24, // 24 hours
  EXCHANGE_RATE: 1000 * 60 * 15, // 15 minutes
  CONVERSION: 1000 * 60 * 2, // 2 minutes
  DEFAULT_STALE: 1000 * 60 * 1, // 1 minute
} as const;

export const DEBOUNCE_DELAY_IN_MS = 300;
