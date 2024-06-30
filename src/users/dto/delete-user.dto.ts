import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'Daniel' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
