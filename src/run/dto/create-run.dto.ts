import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateRunDto {
  @ApiProperty({ description: 'The name of the user', example: 'Daniel' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'The score of the user', example: 100 })
  @IsNumber()
  score: number;

  @ApiProperty({ description: 'The time of the user', example: 100 })
  @IsNumber()
  time: number;

  @ApiProperty({ description: 'The reward of the user', example: 'gold' })
  @IsString()
  reward: string;

  @ApiProperty({ description: 'The classname of the user', example: 'Math' })
  @IsString()
  classname: string;

  @ApiProperty({ description: 'The lesson of the user', example: 'Addition' })
  @IsString()
  lesson: string;

  @ApiProperty({ description: 'The correct answer of the user', example: 10 })
  @IsNumber()
  correctAnswer: number;

  @ApiProperty({ description: 'The wrong answer of the user', example: 5 })
  @IsNumber()
  wrongAnswer: number;

  @ApiProperty({ description: 'The subject of the user', example: 'Math' })
  @IsString()
  subject: string;

  @ApiProperty({ description: 'The difficulty of the user', example: 'easy' })
  @IsString()
  difficulty: string;
}
