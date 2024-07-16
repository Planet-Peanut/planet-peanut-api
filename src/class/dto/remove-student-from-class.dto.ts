import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RemoveStudentFromClassDto {
  @ApiProperty({
    description: 'The class ID',
    example: '1',
  })
  @IsString()
  classID: string;

  @ApiProperty({
    description: 'The username of the student',
    example: 'Damian',
  })
  @IsString()
  username: string;
}
