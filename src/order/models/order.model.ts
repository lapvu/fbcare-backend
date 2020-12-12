import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

    @Prop({ required: true })
    _id: string;

    @Prop({ required: true })
    customer_name: string;

    @Prop({ required: true })
    customer_id: string;

    @Prop({ required: true })
    customer_phone: string;

    @Prop()
    customer_email?: string;

    @Prop({ required: true })
    create_by: string;

    @Prop({ default: null })
    group_id?: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    total_quantity: number;

    @Prop({ default: 1 })
    status?: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
