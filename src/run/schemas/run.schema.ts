import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Run extends Document {
  @Prop({ type: String, trim: true, required: true })
  username: string;

  @Prop({ type: Number, default: null, required: true })
  score: number;

  @Prop({ type: Number, trim: true, required: false })
  time?: number;

  @Prop({ type: Boolean, default: false, required: true })
  reward: boolean;

  @Prop({ type: Object, default: null })
  classname?: Record<string, any>;

  @Prop({ type: Object, default: null })
  lesson?: Record<string, any>;

  @Prop({ type: Number, default: null })
  correctAnswers?: number;

  @Prop({ type: Number, default: null })
  wrongAnswers?: number;

  @Prop({ type: [String], default: [] })
  subject?: string[];

  @Prop({ type: String, default: null })
  difficulty?: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const RunSchema = SchemaFactory.createForClass(Run);
