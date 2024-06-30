import {
  Body,
  Controller,
  Delete,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { ApiTags } from '@nestjs/swagger';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('user')
@Controller('users')
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
}
