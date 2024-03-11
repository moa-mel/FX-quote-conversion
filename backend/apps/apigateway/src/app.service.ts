import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FXQuoteServiceClient, F_XQUOTE_SERVICE_NAME, QuoteRequest, QuoteResponse } from '@app/common';
import { CurrencyServiceClient, CURRENCY_SERVICE_NAME, ConvertRequest, ConvertResponse } from '@app/common/types/fx_conversion';

@Injectable()
export class AppService implements OnModuleInit {
  private fxQuoteServiceClient: FXQuoteServiceClient;
  private currencyServiceClient: CurrencyServiceClient;

  constructor(
    @Inject('fx') private fxClientGrpc: ClientGrpc,
    @Inject('currency') private currencyClientGrpc: ClientGrpc
    ){ }
  
  onModuleInit(){
    this.fxQuoteServiceClient =this.fxClientGrpc.getService<FXQuoteServiceClient>(F_XQUOTE_SERVICE_NAME);
    this.currencyServiceClient = this.currencyClientGrpc.getService<CurrencyServiceClient>(CURRENCY_SERVICE_NAME);
  }

  getQuote(quoteRequest: QuoteRequest){
    return this.fxQuoteServiceClient.getQuote(quoteRequest);
  }

  convertCurrency(convertRequest: ConvertRequest) {
    return this.currencyServiceClient.convertCurrency(convertRequest);
  }

}
