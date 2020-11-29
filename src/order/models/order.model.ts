import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {

    _id: string;

    @Prop({ required: true })
    customer_name: string;

    @Prop({ required: true })
    customer_id: string;

    @Prop({ required: true })
    customer_phone: string;

    @Prop({ required: true })
    customer_email: string;

    @Prop({ required: true })
    supplier_id: string;

    @Prop({ default: null })
    employee_id?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
