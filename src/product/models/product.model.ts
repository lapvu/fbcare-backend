import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    _id?: string;

    @Prop({ required: true })
    productName: string;

    @Prop({ required: true })
    productDesc: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    userId: string;

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
