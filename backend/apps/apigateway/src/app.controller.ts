import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { QuoteRequest, QuoteResponse } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('quote')
  getQuote(@Body() quoteRequest: QuoteRequest){
    return this.appService.getQuote(quoteRequest);
  }
  
  
}
