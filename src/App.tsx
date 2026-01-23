import { CurrencyConverterForm } from '@/components/currencies/CurrencyConverterForm';
import { MainLayout } from '@/components/layouts/MainLayout';
import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <MainLayout>
      <QueryClientProvider client={queryClient}>
        <CurrencyConverterForm />
      </QueryClientProvider>
    </MainLayout>
  );
}

export default App;
