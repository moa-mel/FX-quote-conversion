import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FXQuoteServiceClient, F_XQUOTE_SERVICE_NAME, QuoteRequest, QuoteResponse } from '@app/common';

@Injectable()
export class AppService implements OnModuleInit {
  private fxQuoteServiceClient: FXQuoteServiceClient;
  constructor(@Inject('fx') private clientGrpc: ClientGrpc){ }

  onModuleInit(){
    this.fxQuoteServiceClient =
    this.clientGrpc.getService<FXQuoteServiceClient>
    (F_XQUOTE_SERVICE_NAME);
  }

  getQuote(quoteRequest: QuoteRequest){
    return this.fxQuoteServiceClient.getQuote(quoteRequest);
  }
}
