import { Module } from '@nestjs/common';
import { OrderModule } from 'src/order/order.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [OrderModule],
  controllers: [WebhookController],
  providers: [WebhookService]
})
export class WebhookModule { }
