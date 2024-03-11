import { ConvertRequest, ConvertResponse } from '@app/common/types/fx_conversion';
import { Injectable } from '@nestjs/common';
import { FxConversion, FxConversionDocument } from './fx-conversion.model'; // Ensure correct import here
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class FxConversionService {
  constructor(@InjectModel(FxConversion.name) private fxConversionModel: Model<FxConversion>) {}

  async convertCurrency(convertRequest: ConvertRequest): Promise<ConvertResponse> {
    const { sourceCurrency, destinationCurrency, amount } = convertRequest;
    console.log('Received convert request:', convertRequest);
    const exchangeRate = await this.getExchangeRate(sourceCurrency, destinationCurrency);
    const convertedAmount = exchangeRate * amount;

    await this.savefxConversionModel(convertRequest);

    const convertResponse: ConvertResponse = {
      convertedAmount: convertedAmount,
    };
    console.log(convertResponse)
    return convertResponse;
  }

  private async getExchangeRate(sourceCurrency: string, destinationCurrency: string): Promise<number> {
    console.log(`Received currency pair: ${sourceCurrency}/${destinationCurrency}`);
    // Mocked function to get exchange rate
    const exchangeRateMap = {
      'USD/EUR': 0.85,
      'EUR/USD': 1.18,
      'USD/NGN': 1594.54,
      'NGN/USD': 0.00063,
      // Add more currency pairs as needed
    };

    const currencyPair = `${sourceCurrency}/${destinationCurrency}`;
    const exchangeRate = exchangeRateMap[currencyPair];

    if (exchangeRate === undefined) {
      throw new Error(`Exchange rate not found for ${currencyPair}`);
    }

    return exchangeRate;
  }

  private async savefxConversionModel(convertRequest: ConvertRequest): Promise<void> {
    // Save conversion request to MongoDB using Mongoose model
    const conversionRequest = new this.fxConversionModel(convertRequest);
    await conversionRequest.save();
  }
}
