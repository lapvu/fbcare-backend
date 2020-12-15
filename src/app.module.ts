import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NestEventModule } from 'nest-event';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TransportModule } from './transport/transport.module';
import { NoteModule } from './note/note.module';
import { EmployeeModule } from './employee/employee.module';
import { WebhookModule } from './webhook/webhook.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/fbcare"),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NestEventModule,
    UserModule,
    AuthModule,
    OrderModule,
    ProductModule,
    TransportModule,
    NoteModule,
    EmployeeModule,
    WebhookModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
