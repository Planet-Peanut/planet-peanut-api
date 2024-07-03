import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<User> {
    return this.userModel.findOneAndDelete(deleteUserDto).exec();
  }

  async updateUserItems(
    user: string,
    items: Record<string, any>,
    itemsWorn: Record<string, any>,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ name: user }, { items, itemsWorn })
      .exec();
  }
}
