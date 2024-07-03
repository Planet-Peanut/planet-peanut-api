import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserItemsDto } from './dto/update-useri-tems.dto';

@ApiTags('user')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('new')
  async create(@Body() createIUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createIUserDto);
  }

  @Delete('delete')
  async delete(@Body() deleteUserDto: DeleteUserDto): Promise<User> {
    const user = await this.usersService.delete(deleteUserDto);

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    return user;
  }

  @Put('update-items-user')
  async updateUserItems(@Body() updateUserItemsDto: UpdateUserItemsDto) {
    const { user, items, itemsWorn } = updateUserItemsDto;
    return this.usersService.updateUserItems(user, items, itemsWorn);
  }
}
