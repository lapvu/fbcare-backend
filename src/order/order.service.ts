import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateOrderDto } from './dto/CreateOrder.dto';
import { GetOrdersByCustomerDto } from './dto/GetOrdersByCustomer.dto';
import { Order, OrderDocument } from './models/order.model';
import { TransportService } from 'src/transport/transport.service';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private transportSerive: TransportService,
        private httpService: HttpService
    ) { }

    private SUPER_SHIP_API = "https://api.mysupership.xyz";

    async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<any> {
        const setting = await this.transportSerive.getSetting(userId);
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${setting.token}`
            }
        }
        try {

            const res = await this.httpService.post(`${this.SUPER_SHIP_API}/v1/partner/orders/add`,
                {
                    pickup_phone: "0989999999",
                    pickup_address: "45 Nguyễn Chí Thanh",
                    pickup_commune: "Ngọc Khánh",
                    pickup_district: "Ba Đình",
                    pickup_province: "Hà Nội",
                    name: createOrderDto.customer_name,
                    phone: createOrderDto.customer_phone,
                    email: createOrderDto.customer_email,
                    address: createOrderDto.address,
                    province: createOrderDto.province,
                    district: createOrderDto.district,
                    commune: createOrderDto.commune,
                    amount: createOrderDto.amount,
                    weight: createOrderDto.weight,
                    payer: "1",
                    service: "1",
                    config: "1",
                    product_type: "2",
                    products: createOrderDto.products
                },
                headers
            ).toPromise()
            console.log(res);
            // const order = await this.orderModel.create({
            //     ...createOrderDto,
            //     supplier_id: userId
            // })
            return "order";
        } catch (errors) {
            console.log(errors)
        }
    }

    async getOrdersByCustomer(getOrdersByCustomerDto: GetOrdersByCustomerDto, userId): Promise<any> {
        const orders = await this.orderModel.find({ ...getOrdersByCustomerDto, supplierId: userId });
        return orders
    }
}
