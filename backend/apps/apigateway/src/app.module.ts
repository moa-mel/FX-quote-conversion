import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'fx',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051', 
          package: 'fx',
          protoPath: join(__dirname, '../../fx-quote/fx_quote.proto'),
      },
    }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
