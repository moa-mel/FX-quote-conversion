import { Module } from '@nestjs/common';
import { FxQuoteController } from './fx-quote.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { FxQuoteService } from './fx-quote.service';

@Module({
 /* imports: [
    ClientsModule.register([
      {
        name: 'FX_QUOTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051', 
          package: 'fx',
          protoPath: join(__dirname, '../..s/dist/apps/fx-quote/proto/fx_quote.proto'),
        },
      },
    ]),
  ],*/
  controllers: [FxQuoteController],
  providers: [FxQuoteService],
})
export class FxQuoteModule {}
