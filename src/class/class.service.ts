import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './schemas/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { User } from 'src/users/schemas/user.schema';
import { UserEnrollInClassDto } from './dto/user-enroll-in-class.dto';
import { RemoveStudentFromClassDto } from './dto/remove-student-from-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private classModel: Model<Class>,
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

    classExist.students.push(student['_id']);

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
}
