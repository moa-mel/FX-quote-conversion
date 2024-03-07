import { Controller, Get, Post, Body } from '@nestjs/common';
import { FxQuoteService } from './fx-quote.service';
import { FXQuoteServiceController, QuoteRequest, QuoteResponse } from '@app/common';
import { GrpcMethod } from '@nestjs/microservices';


@Controller('fx')
export class FxQuoteController implements FXQuoteServiceController {
  constructor(private readonly fxQuoteService: FxQuoteService) {}

  /*@Post('quote')
  async getQuote(@Body() request: QuoteRequest): Promise<QuoteResponse> {
    return this.fxQuoteService.getQuote(request);
  } */

  @GrpcMethod('FXQuoteService', 'GetQuote')
  getQuote(quoteRequest: QuoteRequest): QuoteResponse{
    return this.fxQuoteService.getQuote(quoteRequest)
  }
}
