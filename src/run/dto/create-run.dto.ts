import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsObject,
  IsArray,
  IsDate,
  IsOptional,
} from 'class-validator';
import { SchoolType } from 'src/class/schemas/class.schema';

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

  @ApiProperty({ description: 'The reward of the user', example: false })
  @IsBoolean()
  reward: boolean;

  @ApiProperty({
    description: 'The classname of the user',
    example: { grade: 9, letter: 'c', school: 'Albertslund Ungecenter' },
    nullable: true, // Marked as nullable for Swagger documentation
  })
  @IsOptional() // Allows null or undefined values
  @IsObject() // Validates that if present, it must be an object
  classname: SchoolType | null;

  @ApiProperty({
    description: 'The id of the lesson',
    example: '234324-234234-23423',
  })
  @IsString()
  lesson: string;

  @ApiProperty({ description: 'The correct answer of the user', example: 10 })
  @IsNumber()
  correctAnswers: number;

  @ApiProperty({ description: 'The wrong answer of the user', example: 5 })
  @IsNumber()
  wrongAnswers: number;

  @ApiProperty({ description: 'The subject of the user', example: ['Math'] })
  @IsArray()
  subject: string[];
}
