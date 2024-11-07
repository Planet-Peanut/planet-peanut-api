import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsMongoId, IsNumber } from 'class-validator';

export class InfoSchoolDto {
  @ApiProperty({
    description: 'The location of the school, either local or global',
    example: 'global',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'ID of the class in MongoDB',
    example: '670cf2d1516aed0224de3b34',
  })

  @IsMongoId()
  classID: string;

  @ApiProperty({
    description: 'Grade of that particular school',
    example: 8,
  })
  @IsNumber()
  @Type(() => Number)
  grade: number;

  @ApiProperty({
    description: 'Letter representing the class section',
    example: 'e',
  })
  @IsString()
  letter: string;

  @ApiProperty({
    description: 'Name of the school',
    example: '10. klasse Kalundborg',
  })
  @IsString()
  name: string;
}

