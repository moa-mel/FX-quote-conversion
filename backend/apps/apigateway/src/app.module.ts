import { Module ,  NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'
import { FxConversionMiddleware } from 'apps/middleware/fx-conversion.middleware';
import { FxConversionModule } from 'apps/fx-conversion/src/fx-conversion.module';

                                                    

@Module({
  imports: [FxConversionModule,
    ClientsModule.register([
      {
        name: 'fx',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'fx',
          protoPath: join(__dirname, '../../fx-quote/fx_quote.proto'),
        },
      },
      {
        name: 'currency',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50052',
          package: 'currency',
          protoPath: join(__dirname, '../fx_conversion.proto'),
        },
      }
    ])
    
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FxConversionMiddleware).forRoutes("/convert");
  }
};

