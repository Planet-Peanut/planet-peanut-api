import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SchoolType } from 'src/class/schemas/class.schema';

@Schema()
export class Run extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  reward: boolean;

  @Prop({ required: false, type: Object }) // Allow null or undefined values
  classname: SchoolType | null;

  @Prop({ required: true })
  lesson: string;

  @Prop({ required: true })
  correctAnswers: number;

  @Prop({ required: true })
  wrongAnswers: number;

  @Prop({ required: true })
  subject: [string];

  @Prop({ type: Date, required: true, default: Date.now })
  createdAt: Date;
}

export const RunSchema = SchemaFactory.createForClass(Run);
