import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {

    _id: string;

    @Prop({ required: true })
    note: string;

    @Prop({ required: true })
    user_id: string;

    @Prop({ required: true })
    customer_id: string
}

export const NoteSchema = SchemaFactory.createForClass(Note);
