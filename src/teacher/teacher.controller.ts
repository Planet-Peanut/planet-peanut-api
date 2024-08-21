import { Body, Controller, Delete, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './schemas/teacher.schema';
import { RemoveClassFromTeacherDto } from './dto/remove-class-from-teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateClassDto } from 'src/class/dto/create-class.dto';
import { UpdateTeacherPasswordDto } from './dto/update-teacher-password.dto';

@ApiTags('teacher')
@Controller('api/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('create-teacher')
  async createTeacher(
    @Body() createTeacherDto: CreateTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Post('teacher-create-class')
  async teacherCreateClass(
    @Body() createClassDto: CreateClassDto,
  ): Promise<Teacher> {
    return this.teacherService.teacherCreateClass(createClassDto);
  }

  @Post('remove-class-from-teacher')
  async removeClassFromTeacher(
    @Body() removeClassFromTeacherDto: RemoveClassFromTeacherDto,
  ): Promise<Teacher> {
    return this.teacherService.removeClassFromTeacher(
      removeClassFromTeacherDto,
    );
  }

  @Delete('delete-teacher')
  async deleteTeacher(@Body('email') email: string): Promise<Teacher> {
    return this.teacherService.deleteTeacher(email);
  }

  @Put('update-teacher-password')
  async updateTeacherPassword(
    @Body() updateTeacherPasswordDto: UpdateTeacherPasswordDto,
  ): Promise<Teacher> {
    return this.teacherService.changeTeacherPassword(updateTeacherPasswordDto);
  }
}
