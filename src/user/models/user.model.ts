import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    _id: string;

    @Prop()
    group_id?: string;

    @Prop({ required: true })
    display_name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ default: ["supplier"] })
    roles?: [string]
}

export const UserSchema = SchemaFactory.createForClass(User);
