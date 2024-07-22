import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class School {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  kommune: string;

  @Prop({ required: true })
  country: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
