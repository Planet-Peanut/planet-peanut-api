import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class RemoveClassFromTeacherDto {
  @ApiProperty({
    description: 'The teacher ID',
    example: '1',
  })
  @IsString()
  teacherID: Types.ObjectId;

  @ApiProperty({
    description: 'The class ID',
    example: '1',
  })
  @IsString()
  classID: Types.ObjectId;
}
