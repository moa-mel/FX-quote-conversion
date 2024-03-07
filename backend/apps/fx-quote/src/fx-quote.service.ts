import { Injectable } from '@nestjs/common';
import { QuoteRequest, QuoteResponse } from '@app/common';

@Injectable()
export class FxQuoteService {
  getQuote(quoteRequest: QuoteRequest): QuoteResponse {
    const { baseCurrency, quoteCurrency } = quoteRequest;

    const exchangeRate = Math.random() * 10; 

    const response: QuoteResponse = {
      currencyPair: `${baseCurrency}/${quoteCurrency}`,
      exchangeRate: exchangeRate,
      timestamp: new Date().toISOString(),
    };

    return response;
  }
}
