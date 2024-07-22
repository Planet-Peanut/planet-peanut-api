import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { School } from './schemas/school.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private schoolModel: Model<School>) {}

  async addSchool(createSchoolDto: any): Promise<School> {
    const createdSchool = new this.schoolModel(createSchoolDto);
    return createdSchool.save();
  }

  async listOfSchool(): Promise<School[]> {
    return this.schoolModel.find().exec();
  }
}
