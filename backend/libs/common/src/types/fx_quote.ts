/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "fx";

/**
 * base currency, which appears first and the quote or variable currency, which appears last
 * like EUR/USD
 */
export interface QuoteRequest {
  baseCurrency: string;
  quoteCurrency: string;
}

export interface QuoteResponse {
  currencyPair: string;
  exchangeRate: number;
  timestamp: string;
}

export const FX_PACKAGE_NAME = "fx";

export interface FXQuoteServiceClient {
  getQuote(request: QuoteRequest): Observable<QuoteResponse>;
}

export interface FXQuoteServiceController {
  getQuote(request: QuoteRequest): Promise<QuoteResponse> | Observable<QuoteResponse> | QuoteResponse;
}

export function FXQuoteServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getQuote"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("FXQuoteService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("FXQuoteService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const F_XQUOTE_SERVICE_NAME = "FXQuoteService";
