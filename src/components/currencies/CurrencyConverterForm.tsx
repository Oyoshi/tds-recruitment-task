import { useReducer, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/Card';
import { LoadingIndicator } from '@/components/ui/LoadingIndicator';
import { useCurrencies, useConversion } from '@/hooks/useCurrencies';
import { useDebounce } from '@/hooks/useDebounce';
import { DEBOUNCE_DELAY_IN_MS } from '@/lib/constants';
import { formatAmount, parseAmount, getCurrentTime } from '@/lib/utils';
import { CurrencyInput } from './CurrencyInput';

type Source = 'first' | 'second';

interface ConverterState {
  firstAmount: string;
  firstCurrency: string;
  secondAmount: string;
  secondCurrency: string;
  activeSource: Source;
}

type ConverterAction =
  | { type: 'SET_FIRST_AMOUNT'; payload: string }
  | { type: 'SET_SECOND_AMOUNT'; payload: string }
  | { type: 'SET_FIRST_CURRENCY'; payload: string }
  | { type: 'SET_SECOND_CURRENCY'; payload: string }
  | { type: 'CLEAR_AMOUNTS'; payload: Source };

function converterReducer(
  state: ConverterState,
  action: ConverterAction
): ConverterState {
  switch (action.type) {
    case 'SET_FIRST_AMOUNT':
      return { ...state, firstAmount: action.payload, activeSource: 'first' };
    case 'SET_SECOND_AMOUNT':
      return { ...state, secondAmount: action.payload, activeSource: 'second' };
    case 'SET_FIRST_CURRENCY':
      return { ...state, firstCurrency: action.payload, activeSource: 'first' };
    case 'SET_SECOND_CURRENCY':
      return {
        ...state,
        secondCurrency: action.payload,
        activeSource: 'second',
      };
    case 'CLEAR_AMOUNTS':
      return {
        ...state,
        firstAmount: '',
        secondAmount: '',
        activeSource: action.payload,
      };
    default:
      return state;
  }
}

const initialState: ConverterState = {
  firstAmount: '1.00',
  firstCurrency: 'USD',
  secondAmount: '',
  secondCurrency: 'PLN',
  activeSource: 'first',
};

export function CurrencyConverterForm() {
  const [state, dispatch] = useReducer(converterReducer, initialState);

  const { data: currencies = [], isLoading: isLoadingCurrencies } =
    useCurrencies();

  const debouncedActiveAmount = useDebounce(
    state.activeSource === 'first' ? state.firstAmount : state.secondAmount,
    DEBOUNCE_DELAY_IN_MS
  );

  const { data: convertedData } = useConversion(
    state.activeSource === 'first' ? state.firstCurrency : state.secondCurrency,
    state.activeSource === 'first' ? state.secondCurrency : state.firstCurrency,
    parseAmount(debouncedActiveAmount)
  );

  // Derived Values - Centralized display logic
  const displayFirstAmount =
    state.activeSource === 'second' && convertedData
      ? formatAmount(convertedData.value)
      : state.firstAmount;

  const displaySecondAmount =
    state.activeSource === 'first' && convertedData
      ? formatAmount(convertedData.value)
      : state.secondAmount;

  const exchangeRateLabel = useMemo(() => {
    if (state.firstCurrency === state.secondCurrency)
      return `1 ${state.firstCurrency} = 1.00 ${state.secondCurrency}`;
    if (!displayFirstAmount || !displaySecondAmount) {
      return null;
    }
    return `1 ${state.firstCurrency} = ${formatAmount(parseAmount(displaySecondAmount) / parseAmount(displayFirstAmount))} ${state.secondCurrency}`;
  }, [displayFirstAmount, displaySecondAmount]);

  const handleAmountChange = (source: Source, val: string) => {
    if (val === '') {
      dispatch({ type: 'CLEAR_AMOUNTS', payload: source });
      return;
    }
    dispatch({
      type: source === 'first' ? 'SET_FIRST_AMOUNT' : 'SET_SECOND_AMOUNT',
      payload: val,
    });
  };

  const handleFirstAmountChange = (value: string) => {
    handleAmountChange('first', value);
  };

  const handleSecondAmountChange = (value: string) => {
    handleAmountChange('second', value);
  };

  const handleFirstCurrencyChange = (value: string) => {
    if (state.activeSource === 'second') {
      dispatch({ type: 'SET_FIRST_AMOUNT', payload: displayFirstAmount });
    }
    dispatch({ type: 'SET_FIRST_CURRENCY', payload: value });
  };

  const handleSecondCurrencyChange = (value: string) => {
    if (state.activeSource === 'first') {
      dispatch({ type: 'SET_SECOND_AMOUNT', payload: displaySecondAmount });
    }
    dispatch({ type: 'SET_SECOND_CURRENCY', payload: value });
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2 text-center">
        <h1 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Currency Converter
        </h1>
        {exchangeRateLabel && (
          <CardTitle className="text-lg mt-2">
            <p>{exchangeRateLabel}</p>
          </CardTitle>
        )}
      </CardHeader>

      <CardContent>
        {isLoadingCurrencies ? (
          <LoadingIndicator label="Loading currencies..." />
        ) : (
          <form className="flex flex-col gap-4 mb-6">
            <CurrencyInput
              prefix="first"
              currencies={currencies}
              value={displayFirstAmount}
              onAmountChange={handleFirstAmountChange}
              currency={state.firstCurrency}
              onCurrencyChange={handleFirstCurrencyChange}
            />

            <CurrencyInput
              prefix="second"
              currencies={currencies}
              value={displaySecondAmount}
              onAmountChange={handleSecondAmountChange}
              currency={state.secondCurrency}
              onCurrencyChange={handleSecondCurrencyChange}
            />
          </form>
        )}

        <CardFooter>
          <p className="text-xs text-center text-muted-foreground italic">
            Market rates sourced via CurrencyBeacon • Last updated:{' '}
            {getCurrentTime()}
          </p>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
