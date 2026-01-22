import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Separator } from '@/components/ui/Separator';

const BORDERLESS_INPUT_CLASSES = 'border-0 bg-transparent shadow-none';
const CURRENCY_VALUE_INPUT_PLACEHOLDER = '0.00';
const CURRENCY_CODE_INPUT_PLACEHOLDER = 'USD';

interface CurrencyInputProps {
  prefix: string;
  currencies: { code: string; name: string }[];
}

export function CurrencyInput({ currencies, prefix }: CurrencyInputProps) {
  return (
    <div className="flex h-12 w-full items-center rounded-md border border-input bg-background p-2 shadow-sm">
      <Input
        type="number"
        className={BORDERLESS_INPUT_CLASSES}
        placeholder={CURRENCY_VALUE_INPUT_PLACEHOLDER}
        aria-label={`${prefix} field to input currency value`}
        id={`${prefix}-currency-value-input`}
      />
      <Separator orientation="vertical" className="h-full" />
      <Select>
        <SelectTrigger
          className={BORDERLESS_INPUT_CLASSES}
          aria-label={`$prefix} field to select currency`}
        >
          <SelectValue placeholder={CURRENCY_CODE_INPUT_PLACEHOLDER} />
        </SelectTrigger>
        <SelectContent>
          {currencies.map((curr) => (
            <SelectItem key={curr.code} value={curr.code}>
              {curr.code}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
