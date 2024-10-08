import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Run extends Document {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  reward: string;

  @Prop({ required: true })
  classname: string;

  @Prop({ required: true })
  lesson: string;

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true })
  wrongAnswer: number;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  difficulty: string;
}

export const RunSchema = SchemaFactory.createForClass(Run);
