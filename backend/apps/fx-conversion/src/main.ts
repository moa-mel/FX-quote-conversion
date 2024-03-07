import { NestFactory } from '@nestjs/core';
import { FxConversionModule } from './fx-conversion.module';

async function bootstrap() {
  const app = await NestFactory.create(FxConversionModule);
  await app.listen(3000);
}
bootstrap();
