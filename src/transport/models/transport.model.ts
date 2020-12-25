import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransportDocument = Transport & Document;

@Schema({ timestamps: true })
export class Transport {

    @Prop({ required: true })
    access_token: string;

    @Prop({ required: true })
    pickup_phone: string;

    @Prop({ required: true })
    pickup_address: string;

    @Prop({ required: true })
    pickup_province: string;

    @Prop({ required: true })
    pickup_district: string;

    @Prop({ required: true })
    pickup_commune: string;

    @Prop({ required: true })
    group_id: string;
}

export const TransportSchema = SchemaFactory.createForClass(Transport);
