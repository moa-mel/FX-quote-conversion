import { NestFactory } from '@nestjs/core';
import { FxConversionModule } from './fx-conversion.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FxConversionModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50052',
        package: 'currency',
        protoPath: join(__dirname, '../../fx-conversion/fx_conversion.proto'),
      }
    }
  );
  await app.listen();
}
bootstrap();
