import { IsObject } from 'class-validator';
export type SchoolType = {
  name: string;
  grade: number;
  letter: string;
};

export class SchoolDetail {
  @IsObject()
  school: SchoolType;
}
