import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';
import type { Currency } from '@/lib/types';

const BORDERLESS_INPUT_CLASSES = 'border-0 bg-transparent shadow-none';
const CURRENCY_VALUE_INPUT_PLACEHOLDER = '0.00';
const CURRENCY_CODE_INPUT_PLACEHOLDER = 'USD';

type InputValueChangeHandler = (val: string) => void;

interface CurrencyInputProps {
  currencies: Currency[];
  prefix: string;
  value: string;
  onValueChange: InputValueChangeHandler;
  currency: string;
  onCurrencyChange: InputValueChangeHandler;
}

export function CurrencyInput({
  currencies,
  prefix,
  value,
  onValueChange,
  currency,
  onCurrencyChange,
}: CurrencyInputProps) {
  return (
    <div className="flex h-12 w-full items-center rounded-md border border-input bg-background p-2 shadow-sm">
      <Input
        type="number"
        className={BORDERLESS_INPUT_CLASSES}
        placeholder={CURRENCY_VALUE_INPUT_PLACEHOLDER}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        aria-label={`${prefix} field to input currency value`}
        id={`${prefix}-currency-value-input`}
        min="0"
      />
      <Separator orientation="vertical" className="h-full" />
      <Select value={currency} onValueChange={onCurrencyChange}>
        <SelectTrigger
          className={BORDERLESS_INPUT_CLASSES}
          aria-label={`$prefix} field to select currency`}
        >
          <SelectValue placeholder={CURRENCY_CODE_INPUT_PLACEHOLDER} />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.id} value={curr.short_code}>
              {curr.short_code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
