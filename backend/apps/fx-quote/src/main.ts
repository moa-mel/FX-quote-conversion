import { NestFactory } from '@nestjs/core';
import { FxQuoteModule } from './fx-quote.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path'


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FxQuoteModule,
    {  
    
      transport: Transport.GRPC,
        options: {
          url: 'localhost:50051', 
          package: 'fx',
          protoPath: join(__dirname, '../../fx-quote/fx_quote.proto'),
    }
  }
    );
  await app.listen();
}
bootstrap();
