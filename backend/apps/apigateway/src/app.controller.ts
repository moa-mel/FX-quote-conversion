import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { QuoteRequest, QuoteResponse } from '@app/common';
import { ConvertRequest, ConvertResponse } from '@app/common/types/fx_conversion';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('convert')
    async convertCurrency(@Body() convertRequest: ConvertRequest){
        if (!convertRequest.sourceCurrency || !convertRequest.destinationCurrency) {
            throw new Error('Source currency or destination currency not provided');
        }

        const conversionResult = await this.appService.convertCurrency(convertRequest);
        return conversionResult;
    }

  @Post('quote')
  getQuote(@Body() quoteRequest: QuoteRequest){
    return this.appService.getQuote(quoteRequest);
  }
  
  
}
