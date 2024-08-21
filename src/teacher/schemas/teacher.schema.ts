import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Teacher extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: 'Class' })
  classes: Types.ObjectId[];

  @Prop({ required: true })
  password: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
