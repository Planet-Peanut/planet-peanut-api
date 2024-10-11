import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';


export class CreateProgressDto {
  @ApiProperty({ description: 'The name of the user', example: 'Maddy' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The id of the current circle',
    example: 'bd7aecbea-ferefg-efeve-aefd5-3ad5vreebb28ba',
  })
  @IsString()
  circleID: string;
  
  @ApiProperty({
    description: 'The number of times user plays that circle',
    example: 9,
  })
  @IsNumber()
  n: number;

  @ApiProperty({
    description: 'circle has been clicked or not by the user to play',
    example: true,
  })
  @IsBoolean()
  open: boolean;

  @ApiProperty({
    description: 'did the user complete the circle',
    example: false,
  })
  @IsBoolean()
  completed: boolean;

}
