import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, trim: true })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
