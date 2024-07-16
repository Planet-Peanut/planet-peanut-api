import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type SchoolType = {
  name: string;
  grade: number;
  letter: string;
  country: string;
};

@Schema()
export class Class {
  @Prop({ type: Object, required: true })
  school: SchoolType;

  @Prop({ type: [Types.ObjectId], default: [], required: false })
  students: Types.ObjectId[];

  @Prop({})
  teacherID: Types.ObjectId;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
