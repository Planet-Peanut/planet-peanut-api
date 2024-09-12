import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ type: String, unique: true, default: '' })
  supabaseId: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  avatar: string;

  @Prop({ type: Object, default: {} })
  items: Record<string, any>;

  @Prop({ type: Object, default: {} })
  itemsWorn: Record<string, any>;

  @Prop({ type: Number, required: false, trim: true })
  classLevel?: number;

  @Prop({ type: String, default: 'Subscriber' })
  role: string;

  @Prop({ type: Number, default: 0 })
  score: number;

  @Prop({ type: Object, default: {} })
  currency: Record<string, any>;

  @Prop({ type: Number, default: 0 })
  meters: number;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
