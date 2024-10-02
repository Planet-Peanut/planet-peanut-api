import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Run } from './schemas/run.schema';
import { Model } from 'mongoose';
import { CreateRunDto } from './dto/create-run.dto';
import { FindUserNameDto } from '../users/dto/find-user-name.dto';
import { startDate } from '.././utils/helpers';

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
    });
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
    ]);
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
        $project: {
          _id: 0,
          date: '$_id',
        },
      },
    ]);
    const result = { completedToday: false, streak: 0 };
    let dateValues = totalStreak.map((each) =>
      new Date(each['date']).toDateString(),
    );
    if (dateValues.includes(new Date().toDateString())) {
      result.completedToday = true;
      result.streak += 1;
      dateValues = dateValues.slice(1);
    }
    const currentDate = new Date();
    for (const day of dateValues) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (day === currentDate.toDateString()) result.streak++;
      else {
        break;
      }
    }
    return result;
  }

  async getPromotion(userDto: FindUserNameDto): Promise<object> {
    const { name } = userDto;
    const userName = await this.RunModel.findOne({ username: name });
    if (!userName) throw new NotFoundException("user doesn't exsist");

    const runsThisWeek = await this.RunModel.find({
      username: name,
      createdAt: { $gte: startDate().toString() },
    });
    console.log(runsThisWeek);
    const currentTotalScore = runsThisWeek.reduce(
      (accu, current) => accu + current.score,
      0,
    );
    type Result = {
      promotion: boolean;
      league: string;
      reward: number;
      points: number;
    };
    const result: Result = {
      promotion: false,
      league: '',
      reward: 0,
      points: 0,
    };
    //set league as per the current score
    currentTotalScore > 10000
      ? (result.league = 'gold')
      : currentTotalScore < 10000 && currentTotalScore > 5000
        ? (result.league = 'silver')
        : currentTotalScore < 5000 && currentTotalScore > 1000
          ? (result.league = 'bronze')
          : (result.league = 'all');

    result.points = currentTotalScore;
    //set reward for the player
    if (result.league !== 'all') {
      result.league === 'gold'
        ? (result.reward = 5)
        : result.league === 'silver'
          ? (result.reward = 3)
          : (result.reward = 1);
    }

    console.log(currentTotalScore);
    //Total score excluding the latest score
    const previousTotalScore = runsThisWeek
      .slice(0, -1)
      .reduce((accu, current) => accu + current.score, 0);

    let oldLeague: string;
    //Get previous league as per previous score
    previousTotalScore > 10000
      ? (oldLeague = 'gold')
      : previousTotalScore < 10000 && previousTotalScore > 5000
        ? (oldLeague = 'silver')
        : previousTotalScore < 5000 && previousTotalScore > 1000
          ? (oldLeague = 'bronze')
          : (oldLeague = 'all');

    // Check if promotion happened
    if (oldLeague !== result.league) result.promotion = true;

    console.log(previousTotalScore);
    console.log(result);
    return result;
  }
}
