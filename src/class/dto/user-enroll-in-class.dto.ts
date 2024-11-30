import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { SchoolDetail } from '../../school/dto/school-detail.dto';
import { Type } from 'class-transformer';
//import { SchoolType } from '../../school/dto/school-detail.dto';

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
  @ValidateNested()
  @Type(() => SchoolDetail)
  school: SchoolDetail;

  @ApiProperty({
    description: 'The previous school of the user',
    example: { name: 'School', grade: 1, letter: 'A', country: 'Sweden' },
  })
  @ValidateNested()
  @Type(() => SchoolDetail)
  prevSchool: SchoolDetail;
}
