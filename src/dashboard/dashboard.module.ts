import { Module } from '@nestjs/common';
import { NoteModule } from 'src/note/note.module';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [OrderModule, UserModule, ProductModule, NoteModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule { }
