/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "currency";

export interface ConvertRequest {
  sourceCurrency: string;
  destinationCurrency: string;
  amount: number;
}

export interface ConvertResponse {
  convertedAmount: number;
}

export const CURRENCY_PACKAGE_NAME = "currency";

export interface CurrencyServiceClient {
  convertCurrency(request: ConvertRequest): Observable<ConvertResponse>;
}

export interface CurrencyServiceController {
  convertCurrency(request: ConvertRequest): Promise<ConvertResponse> | Observable<ConvertResponse> | ConvertResponse;
}

export function CurrencyServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["convertCurrency"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CurrencyService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CurrencyService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CURRENCY_SERVICE_NAME = "CurrencyService";
