import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { formatAmount, parseAmount, getCurrentTime } from '@/lib/utils';
import { CurrencyInput } from './CurrencyInput';

const mockCurrencies = [
  { code: 'PLN', name: 'Polish Zloty' },
  { code: 'EUR', name: 'Euro' },
  { code: 'USD', name: 'US Dollar' },
];

const EXCHANGE_RATE = 0.34;

export function CurrencyConverterForm() {
  /* Decided to use separated 4 states to represent bi-drectional data flow just for the simplicity.
   * Normally, I would consider using a more robust state management approach (like useReducer, zustand)
   * or a form library for handling complex forms.
   */
  const [firstAmount, setFirstAmount] = useState('1.00');
  const [firstCurrency, setFirstCurrency] = useState('PLN');
  const [secondAmount, setSecondAmount] = useState('0.34');
  const [secondCurrency, setSecondCurrency] = useState('EUR');

  const handleFirstChange = (value: string) => {
    setFirstAmount(value);

    if (value === '') {
      setSecondAmount('');
      return;
    }

    const numericValue = parseAmount(value);
    setSecondAmount(formatAmount(numericValue * EXCHANGE_RATE));
  };

  const handleSecondChange = (value: string) => {
    setSecondAmount(value);

    if (value === '') {
      setFirstAmount('');
      return;
    }

    const numericValue = parseAmount(value);
    setFirstAmount(formatAmount(numericValue / EXCHANGE_RATE));
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="pb-2 text-center">
        <h1 className="text-sm font-medium text-muted-foreground mb-1">
          Forex Currency Converter
        </h1>
        <CardTitle className="text-xl font-bold text-primary">
          1 PLN = 0.34 EUR
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Using a form as a semantic container, even though there's no submission */}
        <form className="flex flex-col gap-4 mb-4">
          <CurrencyInput
            prefix="first"
            currencies={mockCurrencies}
            value={firstAmount}
            onValueChange={handleFirstChange}
            currency={firstCurrency}
            onCurrencyChange={setFirstCurrency}
          />
          <CurrencyInput
            prefix="second"
            currencies={mockCurrencies}
            value={secondAmount}
            onValueChange={handleSecondChange}
            currency={secondCurrency}
            onCurrencyChange={setSecondCurrency}
          />
        </form>
        <p className="text-xs text-center text-muted-foreground">
          Last updated: {getCurrentTime()}
        </p>
      </CardContent>
    </Card>
  );
}
