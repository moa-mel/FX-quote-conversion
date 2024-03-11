import { Module } from '@nestjs/common';
import { FxQuoteController } from './fx-quote.controller';
import { FxQuoteService } from './fx-quote.service';

@Module({
  controllers: [FxQuoteController],
  providers: [FxQuoteService],
})
export class FxQuoteModule {}
