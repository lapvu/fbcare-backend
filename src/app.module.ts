import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { WebhookModule } from './webhook/webhook.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/fbcare"),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    OrderModule,
    WebhookModule,
    ConversationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
