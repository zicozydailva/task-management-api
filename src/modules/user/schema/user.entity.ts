import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({ index: true, type: String, required: true })
  firstName: string;

  @Prop({ index: true, type: String, required: true })
  lastName: string;

  @Prop({
    unique: true,
    index: true,
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    required: false,
    type: String,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
