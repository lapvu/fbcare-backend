import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from "axios";
import * as randomstring from "randomstring";
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { GetOrdersByCustomerDto } from './dto/GetOrdersByCustomer.dto';
import { Order, OrderDocument } from './models/order.model';
import { TransportService } from 'src/transport/transport.service';
import { GetOrders } from './dto/GetOrder.dto';
import { GetFeeDto } from './dto/GetFee.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private transportSerive: TransportService,
    ) { }

    private SUPER_SHIP_API = "https://api.mysupership.vn";

    async createOrder(createOrderDto: CreateOrderDto, user_id: string, group_id: string, display_name: string): Promise<any> {
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
        const soc = "FB" + randomstring.generate({ length: 7, charset: 'numeric' });
        try {
            const data = {
                pickup_phone: setting.pickup_phone,
                pickup_address: setting.pickup_address,
                pickup_commune: JSON.parse(setting.pickup_commune).name,
                pickup_district: JSON.parse(setting.pickup_district).name,
                pickup_province: JSON.parse(setting.pickup_province).name,
                name: createOrderDto.customer_name,
                phone: createOrderDto.customer_phone,
                email: createOrderDto.customer_email || "lapvv62@wru.vn",
                address: createOrderDto.address,
                province: createOrderDto.province,
                district: createOrderDto.district,
                commune: createOrderDto.commune,
                amount: createOrderDto.amount,
                weight: createOrderDto.weight,
                note: createOrderDto.note,
                products: createOrderDto.products,
                payer: "1",
                config: "1",
                service: "1",
                product_type: "2",
                soc
            }
            const res = await axios.post(`${this.SUPER_SHIP_API}/v1/partner/orders/add`, data, headers)
            if (res.data.status === "Success") {
                let total_quantity = 0;
                createOrderDto.products.forEach((e: any) => {
                    total_quantity += e.quantity
                });
                const order = this.orderModel.create({
                    _id: soc,
                    group_id,
                    total_quantity,
                    create_by: user_id,
                    fee: res.data.results.fee,
                    code: res.data.results.code,
                    amount: res.data.results.amount,
                    status: +res.data.results.status,
                    status_name: res.data.results.status_name,
                    customer_id: createOrderDto.customer_id,
                    customer_name: createOrderDto.customer_name,
                    customer_email: createOrderDto.customer_email,
                    customer_phone: createOrderDto.customer_phone,
                    created_name: display_name
                })
                return order;
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: {
                    name: "order",
                    message: error.data
                },
            }, HttpStatus.FORBIDDEN);
        }
    }

    async getOrdersByCustomer(getOrdersByCustomerDto: GetOrdersByCustomerDto, user_id): Promise<any> {
        const orders = await this.orderModel.find({ customer_id: getOrdersByCustomerDto.id, create_by: user_id }).sort({ "createdAt": -1 });
        return orders;
    }

    async getOrders(getOrders: GetOrders, user_id: string, group_id: string, roles: any): Promise<any> {
        if (roles.includes("supplier")) {
            const orders = await this.orderModel.find({ group_id })
                .skip(+getOrders.offset)
                .limit(+getOrders.limit)
                .sort({ "updatedAt": -1 });
            const total = await this.orderModel.count({ group_id });
            return {
                orders,
                total
            }
        } else {
            const orders = await this.orderModel.find({ create_by: user_id })
                .skip(+getOrders.offset)
                .limit(+getOrders.limit)
                .sort({ "updatedAt": -1 });
            const total = await this.orderModel.count({ create_by: user_id });
            return {
                orders,
                total
            }
        }
    }

    async countOrder(user_id: string, group_id: string, roles: any): Promise<any> {
        if (roles.includes("supplier")) {
            const total = await this.orderModel.count({ group_id });
            return total;
        } else {
            const total = await this.orderModel.count({ create_by: user_id });
            return total;
        }
    }

    async udpateStatusOrder(status: number, soc: string): Promise<any> {
        const res = await this.orderModel.updateOne({ _id: soc }, { status });
        return res;
    }

    async cancelOrder(): Promise<any> {
        return null;
    }

    async getFee(getFeeDto: GetFeeDto, user_id: string): Promise<any> {
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
        try {
            const params = `sender_province=${setting.pickup_province}&sender_district=${setting.pickup_district}&receiver_province=${getFeeDto.receiver_province}&receiver_district=${getFeeDto.receiver_district}&weight=${getFeeDto.weight}`
            console.log(params)
            const res = await axios.get(`${this.SUPER_SHIP_API}/v1/partner/orders/price?${params}`, headers);
            if (res.data.status === "Success") {
                return res.data.results.fee;
            }
            return 0;
        } catch (error) {
            console.log(error);
        }
    }
}