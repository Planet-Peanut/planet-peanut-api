import { IsObject } from 'class-validator';
export type SchoolType = {
  name: string;
  grade: number;
  letter: string;
  country: string;
};

export class SchoolDetail {
  @IsObject()
  school: SchoolType;
}
