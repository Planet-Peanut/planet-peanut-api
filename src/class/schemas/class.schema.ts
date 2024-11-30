import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Teacher } from '../../teacher/schemas/teacher.schema';

export type SchoolType = {
  name: string;
  grade: number;
  letter: string;
  country?: string;
};
@Schema({ timestamps: true })
export class Class extends Document {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  grade: number;

  @Prop({ required: true })
  letter: string;

  @Prop()
  country?: string;

  @Prop({ type: [String], default: [] })
  students: string[];

  @Prop({ type: Types.ObjectId, ref: Teacher.name })
  teacherID?: Types.ObjectId;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
