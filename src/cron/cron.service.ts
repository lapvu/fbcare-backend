import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { OrderService } from 'src/order/order.service';
import axios from "axios";
@Injectable()
export class CronService {
    constructor(private orderService: OrderService) { }
    @Cron('*/30 * * * * *')
    async updateStatusOrder() {
        const res = await this.orderService.getOrderStatus();
        const promises = res.map((e) => axios.get(`https://api.mysupership.vn/v1/partner/orders/info?code=${e.code}`).then(res => res.data))
        const data = await Promise.all<any>(promises);
        const prom = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].results.code === res[i].code && +data[i].results.status !== res[i].status) {
                prom.push(this.orderService.udpateStatusOrder(+data[i].results.status, data[i].results.status_name, res[i]._id));
            }
        }
        await Promise.all(prom);
    }
}
