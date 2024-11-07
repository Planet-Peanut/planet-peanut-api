import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { IsArray, IsDate, IsObject, IsString } from 'class-validator';
import { SchoolType } from '../schemas/class.schema';

export class CreateClassDto {
  @ApiProperty({
    description: 'The school of the class',
    example: { name: 'School', grade: 1, letter: 'A', country: 'Sweden' },
  })
  @IsObject()
  school: SchoolType;

  @ApiProperty({
    description: 'List of student IDs enrolled in the class',
    example: ['studentId1', 'studentId2'],
  })
  @IsArray()
  @IsString({ each: true })
  students: string[];


  @ApiProperty({
    description: 'The date and time when the class was created',
    example: '2023-05-25T14:48:00.000Z',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the class was last updated',
    example: '2023-05-25T14:48:00.000Z',
  })
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: 'The teacher ID of the class',
    example: '60d0fe4f5311236168a109ca',
  })
  teacherID: Types.ObjectId;
}