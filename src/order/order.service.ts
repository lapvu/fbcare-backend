import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
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

    private SUPER_SHIP_API = "https://api.mysupership.vn";

    async createOrder(createOrderDto: CreateOrderDto, user_id: string): Promise<any> {
        const setting = await this.transportSerive.getSetting(user_id);
        if (!setting) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: {
                    name: "transport",
                    message: `setting transport not exists!`
                },
            }, HttpStatus.FORBIDDEN);
        }
        
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${setting.access_token}`
            }
        }

        this.httpService.post(`${this.SUPER_SHIP_API}/v1/partner/orders/add`,
            {
                pickup_phone: setting.pickup_phone,
                pickup_address: setting.pickup_address,
                pickup_commune: JSON.parse(setting.pickup_commune).name,
                pickup_district: JSON.parse(setting.pickup_district).name,
                pickup_province: JSON.parse(setting.pickup_province).name,
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
        ).subscribe((response) => {
            console.log(response.data)
        },
            (error) => {
                console.log(error.data)
            })
        return "order";

    }

    async getOrdersByCustomer(getOrdersByCustomerDto: GetOrdersByCustomerDto, userId): Promise<any> {
        const orders = await this.orderModel.find({ ...getOrdersByCustomerDto, supplierId: userId });
        return orders
    }
}
