import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransportDocument = Transport & Document;

@Schema()
export class Transport {

    _id: string;

    @Prop({ required: true })
    token: string;

    @Prop({ required: true })
    userId: string;

}

export const TransportSchema = SchemaFactory.createForClass(Transport);
