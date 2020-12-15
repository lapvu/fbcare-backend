import { Injectable } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { HookRequestDto } from './dto/HookRequest.dto';

@Injectable()
export class WebhookService {
    constructor(private orderService: OrderService) { }
    async updateOrderStatus(hookRequestDto: HookRequestDto): Promise<void> {
        await this.orderService.udpateStatusOrder(+hookRequestDto.status, hookRequestDto.soc);
    }
}
