import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class FindUserNameDto {
  @ApiProperty({ description: 'The name of the user', example: 'Daniel' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}