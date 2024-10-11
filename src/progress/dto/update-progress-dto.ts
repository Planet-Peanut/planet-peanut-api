import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject, IsNotEmpty } from 'class-validator';


export class UpdateProgressDto {
  @ApiProperty({ description: 'The name of the user', example: 'Maddy' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The id of the current circle',
    example: 'bd7aecbea-ferefg-efeve-aefd5-3ad5vreebb28ba',
  })
  @IsString()
  @IsNotEmpty()
  circleID: string;
  
  @IsObject()
  @IsNotEmpty()
  newContext: Record<string, any>;
}
