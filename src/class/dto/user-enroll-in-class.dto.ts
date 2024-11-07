import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { SchoolDetail } from '../../school/dto/school-detail.dto';

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
  school: SchoolDetail;

  @ApiProperty({
    description: 'The previous school of the user',
    example: { name: 'School', grade: 1, letter: 'A', country: 'Sweden' },
  })
  @IsObject()
  prevSchool: SchoolDetail;
}