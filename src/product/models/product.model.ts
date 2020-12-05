import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    _id?: string;

    @Prop({ required: true })
    group_id: string;

    @Prop({ required: true })
    product_name: string;

    @Prop({ required: true })
    product_desc: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    image: string;

    @Prop({ default: 1 })
    quantity: number;

    @Prop({ default: 1 })
    weight: number;

    @Prop({ default: 1 })
    length: number;

    @Prop({ default: 1 })
    width: number;

    @Prop({ default: 1 })
    height: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
