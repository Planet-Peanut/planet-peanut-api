import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    description: 'The teacher name',
    example: 'Damian Amalraj',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The teacher email',
    example: 'a@x.se',
  })
  @IsString()
  email: string;
}
