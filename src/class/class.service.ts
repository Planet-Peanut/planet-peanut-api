import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './schemas/class.schema';
import { Run } from '../run/schemas/run.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { User } from 'src/users/schemas/user.schema';
import { UserEnrollInClassDto } from './dto/user-enroll-in-class.dto';
import { RemoveStudentFromClassDto } from './dto/remove-student-from-class.dto';
import { InfoSchoolDto  } from '../school/dto/create-info.dto';
import { getListofClasses, mergeAndSortArrays } from '.././utils/helpers';
import { getCompetitionBoardQuery } from '.././utils/helpers';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<Class>,
    @InjectModel(Run.name) private runModel: Model<Run>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  async userEnrollInClass(
    userEnrollInClassDto: UserEnrollInClassDto,
  ): Promise<Class> {
    const { username, school } = userEnrollInClassDto;

    const classExist = await this.classModel.findOne({ school });
    if (!classExist) {
      throw new NotFoundException('Class not found');
    }

    const student = await this.userModel.findOne({ name: username });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    classExist.students.push(student['_id'].toString());

    return classExist.save();
  }

  async removeStudentFromClass(
    removeStudentFromClassDto: RemoveStudentFromClassDto,
  ): Promise<Class> {
    const { username, classID } = removeStudentFromClassDto;

    const classExist = await this.classModel.findById(classID);

    if (!classExist) {
      throw new NotFoundException('Class not found');
    }

    const student = await this.userModel.findOne({ name: username });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    classExist.students = classExist.students.filter(
      (student) => student !== student['_id'],
    );

    return classExist.save();
  }

  //GetCompetitionBoard
  async getCompetitionBoard(
    infoDto: InfoSchoolDto,
  ): Promise<Record<string, any>> {
    const schoolName = decodeURIComponent(InfoSchoolDto.name);
    if (!schoolName || schoolName == '') return;

     //Dates:
    const startDate = {
      DK: new Date('2024-05-28T12:00:00'),
    };
    const endDate = {
      DK: new Date('2024-06-07T11:00:00'),
    };

    //Get List of classes 
    const classes = await getListofClasses(this.classModel);

    interface CompetitionBoardQuery {
      n: number;
      area: string;
      school: string;
      startDate: Date;
      endDate: Date;
      country: string;
    }
    const query: CompetitionBoardQuery = {
      n: 100,
      area: infoDto.location,
      school: schoolName,
      startDate: startDate['DK'],
      endDate: endDate['DK'],
      country: 'DK',
    };
    // Get data
    const board: Array<Record<string, any>> = await getCompetitionBoardQuery(
      query,
      this.runModel,
    );
     //Merge
    const mergedArray: Record<string, any>[] = mergeAndSortArrays(
      classes,
      board,
    );

    return {
      board: mergedArray,
      startDate: startDate['DK'],
      endDate: endDate['DK'],
    }
}
}