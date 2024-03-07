import { Controller, Get } from '@nestjs/common';
import { FxConversionService } from './fx-conversion.service';

@Controller()
export class FxConversionController {
  constructor(private readonly fxConversionService: FxConversionService) {}

  @Get()
  getHello(): string {
    return this.fxConversionService.getHello();
  }
}
