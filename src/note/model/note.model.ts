import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {

    @Prop({ required: true })
    group_id: string;

    @Prop({ required: true })
    create_by: string;

    @Prop({ required: true })
    customer_id: string;

    @Prop({ required: true })
    note: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
