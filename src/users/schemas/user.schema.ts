import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item } from './item.schema';
import { ItemsWorn } from './itemsWorn.schema';

@Schema()
export class User {
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @Prop({ required: true, trim: true })
  avatar: string;

  @Prop({ type: Object, default: {} })
  items: Item;

  @Prop({ type: Object, default: {} })
  itemsWorn: ItemsWorn;
}

export const UserSchema = SchemaFactory.createForClass(User);
