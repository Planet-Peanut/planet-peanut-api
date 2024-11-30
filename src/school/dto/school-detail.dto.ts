import { IsNumber, IsOptional, IsString } from 'class-validator';
export class SchoolDetail {
  @IsString()
  name: string;

  @IsNumber()
  grade: number;

  @IsString()
  letter: string;

  @IsOptional()
  @IsString()
  country?: string;
}
