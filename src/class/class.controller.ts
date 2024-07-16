import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ClassService } from './class.service';

import { Class } from './schemas/class.schema';
import { ApiTags } from '@nestjs/swagger';
import { UserEnrollInClassDto } from './dto/user-enroll-in-class.dto';
import { RemoveStudentFromClassDto } from './dto/remove-student-from-class.dto';

@ApiTags('class')
@Controller('api/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post('user-enroll-in-class')
  async userEnrollInClass(
    @Body() userEnrollInClassDto: UserEnrollInClassDto,
  ): Promise<Class> {
    return this.classService.userEnrollInClass(userEnrollInClassDto);
  }

  @Delete('remove-student-from-class')
  async removeStudentFromClass(
    @Body() removeStudentFromClassDto: RemoveStudentFromClassDto,
  ): Promise<Class> {
    return this.classService.removeStudentFromClass(removeStudentFromClassDto);
  }
}
