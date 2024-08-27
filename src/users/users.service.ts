import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { Item } from './schemas/item.schema';
import { ItemsWorn } from './schemas/itemsWorn.schema';

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
    items: Item,
    itemsWorn: ItemsWorn,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate(
        { name: user }, // Query to find the user
        {
          $set: {
            items,
            itemsWorn,
          },
        }, // Use $set to update or add the fields
        { new: true, upsert: true }, // Return the updated document; create a new document if it doesn't exist
      )
      .exec();
  }
}
