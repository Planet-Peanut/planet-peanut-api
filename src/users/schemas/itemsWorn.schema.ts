import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ItemsWorn {
  @Prop({ required: false })
  body: string;

  @Prop({ required: true })
  glasses: string;

  @Prop({ required: true })
  hats: string;

  @Prop({ required: true })
  pants: string;

  @Prop({ required: true })
  shoes: string;
}

export const ItemsWornSchema = SchemaFactory.createForClass(ItemsWorn);
