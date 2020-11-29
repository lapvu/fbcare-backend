import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transport, TransportSchema } from './models/transport.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transport.name, schema: TransportSchema }])],
  providers: [TransportService],
  controllers: [TransportController],
  exports: [TransportService]
})
export class TransportModule { }
