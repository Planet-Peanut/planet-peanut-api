import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTeacherPasswordDto {
  @ApiProperty({
    description: 'The teacher email',
    example: 'a@x.se',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The Old password',
    example: '12345678',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description: 'The New password',
    example: '87654321',
  })
  @IsString()
  newPassword: string;
}
