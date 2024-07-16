import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { SchoolType } from 'src/class/schemas/class.schema';

export class UserEnrollInClassDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Damian',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The school of the user',
    example: { name: 'School', grade: 1, letter: 'A', country: 'Sweden' },
  })
  @IsObject()
  school: SchoolType;

  @ApiProperty({
    description: 'The previous school of the user',
    example: { name: 'School', grade: 1, letter: 'A', country: 'Sweden' },
  })
  @IsObject()
  prevSchool: SchoolType;
}
