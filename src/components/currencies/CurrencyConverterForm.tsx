import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useCurrencies, useConversion } from '@/hooks/useCurrencies';
import { useDebounce } from '@/hooks/useDebounce';
import { formatAmount, parseAmount, getCurrentTime } from '@/lib/utils';
import { CurrencyInput } from './CurrencyInput';

const DEBOUNCE_DELAY_IN_MS = 500;

// Should be extracted to a separate component but I don't want to mix custom ones with the shadcnui atomic components
function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center">
      <p>Loading currencies...</p>
    </div>
  );
}

export function CurrencyConverterForm() {
  /* Decided to use separated 4 states to represent bi-drectional data flow just for the simplicity.
   * Normally, I would consider using a more robust state management approach (like useReducer, zustand)
   * or a form library for handling complex forms.
   */
  const [firstAmount, setFirstAmount] = useState('');
  const [firstCurrency, setFirstCurrency] = useState('PLN');
  const [secondAmount, setSecondAmount] = useState('');
  const [secondCurrency, setSecondCurrency] = useState('EUR');

  const [activeSource, setActiveSource] = useState<'first' | 'second'>('first');

  // No handling error because of time constraints of the task but normally I would show a toaster and log the error via logger service
  const { data: currencies = [], isLoading: isLoadingCurrencies } =
    useCurrencies();

  // Split debounce into separate states to prevent value flickering when switching active inputs
  // This ensures that the conversion logic always uses the debounced value corresponding to the correct input field
  const debouncedFirstAmount = useDebounce(firstAmount, DEBOUNCE_DELAY_IN_MS);
  const debouncedSecondAmount = useDebounce(secondAmount, DEBOUNCE_DELAY_IN_MS);

  // Determine the active source value based on the debounced states
  const activeAmountRaw =
    activeSource === 'first' ? debouncedFirstAmount : debouncedSecondAmount;
  const amountToConvert = parseAmount(activeAmountRaw);

  const { data: convertedData } = useConversion(
    activeSource === 'first' ? firstCurrency : secondCurrency,
    activeSource === 'first' ? secondCurrency : firstCurrency,
    amountToConvert
  );

  const displayFirstAmount =
    activeSource === 'second' && convertedData
      ? formatAmount(convertedData.value)
      : firstAmount;

  const displaySecondAmount =
    activeSource === 'first' && convertedData
      ? formatAmount(convertedData.value)
      : secondAmount;

  const handleFirstAmountChange = (val: string) => {
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric < 0) return;
    setActiveSource('first');
    setFirstAmount(val);
    if (val === '') {
      setSecondAmount('');
    }
  };

  const handleSecondAmountChange = (val: string) => {
    const numeric = parseFloat(val);
    if (!isNaN(numeric) && numeric < 0) return;
    setActiveSource('second');
    setSecondAmount(val);
    if (val === '') {
      setFirstAmount('');
    }
  };

  const handleFirstCurrencyChange = (val: string) => {
    if (activeSource !== 'first') {
      setFirstAmount(displayFirstAmount);
    }
    setActiveSource('first');
    setFirstCurrency(val);
  };

  const handleSecondCurrencyChange = (val: string) => {
    if (activeSource !== 'second') {
      setSecondAmount(displaySecondAmount);
    }
    setActiveSource('second');
    setSecondCurrency(val);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2 text-center">
        <h1 className="text-sm font-medium text-muted-foreground mb-1">
          Forex Currency Converter
        </h1>
        {!isLoadingCurrencies &&
          !!displayFirstAmount &&
          !!displaySecondAmount && (
            <CardTitle className="text-xl font-bold text-primary">
              {displayFirstAmount} {firstCurrency} = {displaySecondAmount}{' '}
              {secondCurrency}
            </CardTitle>
          )}
      </CardHeader>
      <CardContent>
        {isLoadingCurrencies ? (
          <LoadingIndicator />
        ) : (
          <form className="flex flex-col gap-4 mb-4">
            {/* Using a form as a semantic container, even though there's no submission */}
            <CurrencyInput
              prefix="first"
              currencies={currencies}
              value={displayFirstAmount}
              onValueChange={handleFirstAmountChange}
              currency={firstCurrency}
              onCurrencyChange={handleFirstCurrencyChange}
            />
            <CurrencyInput
              prefix="second"
              currencies={currencies}
              value={displaySecondAmount}
              onValueChange={handleSecondAmountChange}
              currency={secondCurrency}
              onCurrencyChange={handleSecondCurrencyChange}
            />
          </form>
        )}
        {!isLoadingCurrencies && (
          <p className="text-xs text-center text-muted-foreground">
            Last updated: {getCurrentTime()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
