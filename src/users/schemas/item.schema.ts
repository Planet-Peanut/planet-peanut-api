import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Item {
  @Prop({ required: true })
  body: [string];

  @Prop({ required: true })
  glasses: [string];

  @Prop({ required: true })
  hats: [string];

  @Prop({ required: true })
  pants: [string];

  @Prop({ required: true })
  shoes: [string];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
