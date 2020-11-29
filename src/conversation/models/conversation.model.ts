import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema()
export class Conversation {
    @Prop()
    _id?: string;

    @Prop()
    userId?: string;

    @Prop({ required: true })
    sender: string;

    @Prop({ required: true })
    recipient: string;

    @Prop()
    messages: [Message]

    @Prop({ default: 1 })
    nmsg: number;

    @Prop({ required: true })
    first: number;

    @Prop({ required: true })
    last: number;

    @Prop({ default: true })
    type: boolean;
}

@Schema()
class Message {

    @Prop()
    time: number;

    @Prop()
    mid: string;

    @Prop()
    is_echo: boolean;

    @Prop()
    text: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
