import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Progress extends Document {
  @Prop({ type: String, required: true })
  username: string;
  
  @Prop({ type: String, trim: true, required: true })
  circleID: string;

  @Prop({ type: Number, trim: true, required: true, default: 0 })
  n: number;

  @Prop({ type: Boolean, default: false })
  open: boolean;
  
  @Prop({ type: Boolean, default: false })
  completed: boolean;
  
  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
