import type { Currency, ConversionRate } from '@/lib/types';

/**
 * FXService is responsible only for the CurrencyBeacon API direct communication.
 * It's following the SRP rule because the business logic like caching, error handling strategies are handled elsewhere (tanstack query hooks).
 */
export class FXService {
  private readonly _baseURL: string;
  private readonly _apiKey: string;

  /**
   * Creates an instance of FXService.
   * @param {string} apiKey - API key for CurrencyBeacon.
   */
  constructor(apiKey: string) {
    this._baseURL = 'https://api.currencybeacon.com/v1';
    this._apiKey = apiKey;
  }

  /**
   * Fetches a list of all available currencies from the API.
   * * @returns {Promise<Array<Currency>>} A promise that resolves to an array of currency objects.
   * @throws {Error} Throws an error if the request fails.
   */
  async fetchCurrencies(): Promise<Currency[]> {
    const url = `${this._baseURL}/currencies?api_key=${this._apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      // Used plain console.error to avoid any additional dependencies but in normal production code I would use a logging library, send it to Splunk or smth like that
      console.error(
        'FXService.fetchCurrencies - API response not ok',
        response
      );
      throw new Error(`Failed to fetch currencies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }

  /**
   * Performs a currency conversion between two specific currencies.
   * * @param {string} from - The source currency code (e.g. 'USD').
   * @param {string} to - The target currency code (e.g. 'EUR').
   * @param {number} amount - The numeric value to be converted.
   * @returns {Promise<ConversionRate>} A promise that resolves to the converted amount.
   * @throws {Error} Throws an error if the conversion parameters are invalid or the request fails.
   */
  async convert(
    from: string,
    to: string,
    amount: number
  ): Promise<ConversionRate> {
    const params = new URLSearchParams({
      api_key: this._apiKey,
      from,
      to,
      amount: amount.toString(),
    });

    const url = `${this._baseURL}/convert?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      console.error('FXService.convert - API response not ok', response);
      throw new Error(`Conversion failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }
}
