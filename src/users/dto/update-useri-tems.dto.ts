import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsObject } from 'class-validator';
import { Item } from '../schemas/item.schema';
import { ItemsWorn } from '../schemas/itemsWorn.schema';

export class UpdateUserItemsDto {
  @ApiProperty({ description: 'The name of the user', example: 'Daniel' })
  @IsString()
  user: string;

  @ApiProperty({
    description: 'The items of the user',
    example: {
      body: ['2'],
      glasses: [],
      hats: [],
      pants: [],
      shoes: ['74', '69'],
    },
  })
  @IsObject()
  items: Item;

  @ApiProperty({
    description: 'The items worn by the user',
    example: { body: '2', glasses: null, hats: null, pants: null, shoes: '69' },
  })
  @IsObject()
  itemsWorn: ItemsWorn;
}
