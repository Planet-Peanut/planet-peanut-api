import { IsString, IsNumber } from 'class-validator';

export class CreateRunDto {
  @IsString()
  user: string;

  @IsNumber()
  score: number;

  @IsNumber()
  time: number;

  @IsString()
  reward: string;

  @IsString()
  classname: string;

  @IsString()
  lesson: string;

  @IsNumber()
  correctAnswer: number;

  @IsNumber()
  wrongAnswer: number;

  @IsString()
  subject: string;

  @IsString()
  difficulty: string;
}
