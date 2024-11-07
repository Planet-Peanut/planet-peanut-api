import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class School extends Document {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  kommune: string;

  @Prop({ required: true })
  country: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
