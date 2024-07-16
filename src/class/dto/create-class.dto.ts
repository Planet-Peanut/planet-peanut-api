import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { SchoolType } from '../schemas/class.schema';

export class CreateClassDto {
  @ApiProperty({
    description: 'The school of the class',
    example: { name: 'School', grade: 1, letter: 'A', country: 'Sweden' },
  })
  @IsObject()
  school: SchoolType;

  @ApiProperty({
    description: 'The teacher ID of the class',
    example: '1',
  })
  @IsString()
  teacherID: string;
}
