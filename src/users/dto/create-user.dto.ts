import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'Daniel' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'The avatar of the user', example: 'Lion' })
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;
}
