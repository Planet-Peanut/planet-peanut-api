import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { name } = userDto;
    const totalRun: number = await this.RunModel.countDocuments({
      username: name,
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date(),
      },
    })
    return 100 * totalRun;
  }

  //Get Problem Solved of an user from midnight to till now
  async getProblemSolved(userDto: FindUserNameDto): Promise<number> {
    const { name } = userDto;
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date();
    const problemSolved: Array<any> = await this.RunModel.aggregate([
      {
        $match: {
          username: name,
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

  async getTotalStreak(userDto: FindUserNameDto): Promise<object> {
    const { name } = userDto;
    const user = await this.RunModel.findOne({ username: name });
    if (!user) throw new NotFoundException("user doesn't exsist");
    const totalStreak = await this.RunModel.aggregate([
      {
        $match: {
          username: name,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              timezone: 'Europe/Copenhagen',
              format: '%Y-%m-%d',
              date: '$createdAt',
            },
          },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $project:{
          _id: 0,
          date: '$_id',
        },
      }
    ]);
    const result = { completedToday: false, streak: 0 };
    let dateValues = totalStreak.map((each) =>
      new Date(each['date']).toDateString(),
    );
 
    if (dateValues.includes(new Date().toDateString())){
      result.completedToday = true;
      result.streak += 1;
      dateValues = dateValues.slice(1);
    }
    const currentDate = new Date();
   
    for (const day of dateValues) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (day === currentDate.toDateString()) result.streak++;
      else{
        break
      }
    }
    console.log(result);
    return result;
  }
  }

