import { Body, Controller, Post, UseGuards, Request, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { GetOrdersByCustomerDto } from './dto/GetOrdersByCustomer.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderSerivce: OrderService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    createOrder(@Body() createOrder: CreateOrderDto, @Request() req) {
        return this.orderSerivce.createOrder(createOrder, req.user.user_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getOrdersByCustomer(@Param() getOrdersByCustomerDto: GetOrdersByCustomerDto, @Request() req) {
        return this.orderSerivce.getOrdersByCustomer(getOrdersByCustomerDto, req.user.user_id);
    }
}
