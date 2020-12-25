import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { NestEventModule } from 'nest-event';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TransportModule } from './transport/transport.module';
import { NoteModule } from './note/note.module';
import { EmployeeModule } from './employee/employee.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CronService } from './cron/cron.service';

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
    DashboardModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [CronService],
})
export class AppModule { }
