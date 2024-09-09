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
    const { name } = userDto;
    const totalRun = await this.RunModel.countDocuments({
      user: name,
      createdAt: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date(),
      }
    });
    return 100 * totalRun;
  }
}
