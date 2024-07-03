import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Run } from './schemas/run.schema';
import { Model } from 'mongoose';
import { CreateRunDto } from './dto/create-run.dto';

@Injectable()
export class RunService {
  constructor(@InjectModel(Run.name) private RunModel: Model<Run>) {}

  async createRun(createRunDto: CreateRunDto): Promise<Run> {
    const createdRun = new this.RunModel(createRunDto);
    return createdRun.save();
  }
}
