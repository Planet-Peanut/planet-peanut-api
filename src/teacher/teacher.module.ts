import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './schemas/teacher.schema';
import { ClassSchema } from 'src/class/schemas/class.schema';
import { ClassService } from 'src/class/class.service';
import { UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher', schema: TeacherSchema }]),
    MongooseModule.forFeature([{ name: 'Class', schema: ClassSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [TeacherService, ClassService],
  controllers: [TeacherController],
})
export class TeacherModule {}
