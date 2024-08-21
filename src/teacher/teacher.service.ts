import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './schemas/teacher.schema';
import { Model } from 'mongoose';
import { RemoveClassFromTeacherDto } from './dto/remove-class-from-teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ClassService } from 'src/class/class.service';
import { Class } from 'src/class/schemas/class.schema';
import { CreateClassDto } from 'src/class/dto/create-class.dto';
import * as bcrypt from 'bcrypt';
import { UpdateTeacherPasswordDto } from './dto/update-teacher-password.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
    private readonly classService: ClassService,
    @InjectModel(Class.name) private classModel: Model<Class>,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { password } = createTeacherDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new this.teacherModel({
      ...createTeacherDto,
      password: hashedPassword,
    });

    return teacher.save();
  }

  async teacherCreateClass(createClassDto: CreateClassDto): Promise<Teacher> {
    const { school, teacherID } = createClassDto;

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(teacherID);
    if (!isObjectId) throw new BadRequestException('Invalid teacher ID');

    const teacher = await this.teacherModel.findById(teacherID);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const createClass = await this.classService.createClass({
      school: school,
      teacherID: teacherID,
    });
    teacher.classes.push(createClass['_id']);

    return teacher.save();
  }

  async removeClassFromTeacher(
    removeClassFromTeacherDto: RemoveClassFromTeacherDto,
  ): Promise<Teacher> {
    const { teacherID, classID } = removeClassFromTeacherDto;

    const teacher = await this.teacherModel.findById(teacherID);
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    const classToRemove = await this.classModel.findById(classID);
    if (!classToRemove) {
      throw new Error('Class not found');
    }

    teacher.classes = teacher.classes.filter(
      (classItem) => classItem.toString() !== classID.toString(),
    );

    return teacher.save();
  }

  async deleteTeacher(email: string): Promise<Teacher> {
    const teacher = await this.teacherModel.findOne({
      email: email.toString(),
    });

    console.log('email' + email + 'email.toString()' + email.toString());
    console.log('teacher' + teacher);

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    await this.teacherModel.deleteOne(teacher['_id']);

    return teacher;
  }

  async changeTeacherPassword(
    updateTeacherPasswordDto: UpdateTeacherPasswordDto,
  ): Promise<Teacher> {
    const { email, oldPassword, newPassword } = updateTeacherPasswordDto;

    const teacher = await this.teacherModel.findOne({
      email: email.toString(),
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, teacher.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    teacher.password = await bcrypt.hash(newPassword, 10);

    return teacher.save();
  }
}
