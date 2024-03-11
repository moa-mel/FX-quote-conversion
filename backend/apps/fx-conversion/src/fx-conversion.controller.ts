import { Controller } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';
import { ConvertRequest, ConvertResponse } from '@app/common/types/fx_conversion';
import { GrpcMethod } from '@nestjs/microservices';
import { CurrencyServiceController } from '@app/common/types/fx_conversion';

@Controller()
export class FxConversionController implements CurrencyServiceController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  /*@Post('convert')
  async convertCurrency(@Body() request: any): Promise<any> {
    return this.fxConversionService.convertCurrency(request);
  } */
  @GrpcMethod('CurrencyService', 'ConvertCurrency')
  convertCurrency(convertRequest: ConvertRequest): Promise<ConvertResponse>{
    return this.fxConversionService.convertCurrency(convertRequest)
  }
}
