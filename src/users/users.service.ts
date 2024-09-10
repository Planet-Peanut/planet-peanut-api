import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { FindUserNameDto } from './dto/find-user-name.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  //check total number of  uers in the Application
  async userCount(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }

  //Check validaity of an userName
  async checkUserName(findUsernameDto: FindUserNameDto): Promise<boolean> {
    const userNameExist = await this.userModel.findOne(findUsernameDto);
    return userNameExist ? true : false;
  }
}
