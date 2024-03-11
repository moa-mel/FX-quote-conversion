import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FxConversionController } from './fx-conversion.controller';
import { FxConversionService } from './fx-conversion.service';
import { FxConversionSchema } from './fx-conversion.model';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forFeature([{ name: 'FxConversion', schema: FxConversionSchema }]),
   
  ],
  controllers: [FxConversionController],
  providers: [FxConversionService
  ],
})
export class FxConversionModule {}
