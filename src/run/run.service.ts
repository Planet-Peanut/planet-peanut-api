import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Run } from './schemas/run.schema';
import { Model } from 'mongoose';
import { CreateRunDto } from './dto/create-run.dto';
import { FindUserNameDto } from '../users/dto/find-user-name.dto';

@Injectable()
export class RunService {
  constructor(@InjectModel(Run.name) private RunModel: Model<Run>) {}

  async createRun(createRunDto: CreateRunDto): Promise<Run> {
    const createdRun = new this.RunModel(createRunDto);
    return createdRun.save();
  }
  // Getting total runds for a specific user from midnight to till now

  async getTotalRuns(userDto: FindUserNameDto): Promise<number> {
    const { username } = userDto;
    const totalRun: number = await this.RunModel.countDocuments({
      username: username,
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date(),
      },
    })
    return 100 * totalRun;
  }

  //Get Problem Solved of an user from midnight to till now
  async getProblemSolved(userDto: FindUserNameDto): Promise<number> {
    const { username } = userDto;
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    const problemSolved: Array<any> = await this.RunModel.aggregate([
      {
        $match: {
          username: username,
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          correctAnswers: { $sum: '$correctAnswers' },
        },
      },
    ])
    return problemSolved.length > 0 ? problemSolved[0].correctAnswers : 0;
  }
  }

