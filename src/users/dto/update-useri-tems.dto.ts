import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';

export class UpdateUserItemsDto {
  @ApiProperty({ description: 'The name of the user', example: 'Daniel' })
  @IsString()
  user: string;

  @ApiProperty({
    description: 'The items of the user',
    example: { item: 'sword' },
  })
  @IsObject()
  items: Record<string, any>;

  @ApiProperty({
    description: 'The items worn by the user',
    example: { head: 'helmet' },
  })
  @IsObject()
  itemsWorn: Record<string, any>;
}
