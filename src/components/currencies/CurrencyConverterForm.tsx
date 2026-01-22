import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CurrencyInput } from './CurrencyInput';

const mockCurrencies = [
  { code: 'PLN', name: 'Polish Zloty' },
  { code: 'EUR', name: 'Euro' },
  { code: 'USD', name: 'US Dollar' },
];

export function CurrencyConverterForm() {
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
        <form className="flex flex-col gap-4 mb-4">
          <CurrencyInput prefix="first" currencies={mockCurrencies} />
          <CurrencyInput prefix="second" currencies={mockCurrencies} />
        </form>
        <p className="text-xs text-center text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
}
