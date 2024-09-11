import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  username: string;

  @Prop({ required: true, trim: true })
  avatar: string;

  @Prop({ type: Object, default: {} })
  items: Record<string, any>;

  @Prop({ type: Object, default: {} })
  itemsWorn: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
