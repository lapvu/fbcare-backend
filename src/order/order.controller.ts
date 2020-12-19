import { Body, Controller, Post, UseGuards, Request, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { GetFeeDto } from './dto/GetFee.dto';
import { GetOrders } from './dto/GetOrder.dto';
import { GetOrdersByCustomerDto } from './dto/GetOrdersByCustomer.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderSerivce: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Body() createOrder: CreateOrderDto, @Request() req) {
        return this.orderSerivce.createOrder(createOrder, req.user.user_id, req.user.group_id, req.user.display_name);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/customer")
    getOrdersByCustomer(@Query() getOrdersByCustomerDto: GetOrdersByCustomerDto, @Request() req) {
        return this.orderSerivce.getOrdersByCustomer(getOrdersByCustomerDto, req.user.user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    getOrders(@Query() getOrders: GetOrders, @Request() req) {
        return this.orderSerivce.getOrders(getOrders, req.user.user_id, req.user.group_id, req.user.roles);
    }

    @UseGuards(JwtAuthGuard)
    @Post("/fee")
    getFee(@Body() getFeeDto: GetFeeDto, @Request() req) {
        return this.orderSerivce.getFee(getFeeDto, req.user.user_id);
    }
}
