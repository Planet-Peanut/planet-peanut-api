import { Body, Controller, Delete, Get, Query } from '@nestjs/common';
import { ClassService } from './class.service';
import { Class } from './schemas/class.schema';
import { ApiTags } from '@nestjs/swagger';
import { RemoveStudentFromClassDto } from './dto/remove-student-from-class.dto';
import { InfoSchoolDto } from '../school/dto/create-info.dto';

@ApiTags('class')
@Controller('api/class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  //@Post('user-enroll-in-class')
  //async userEnrollInClass(
    //@Body() userEnrollInClassDto: UserEnrollInClassDto,
  //): Promise<Class> {
   // return this.classService.userEnrollInClass(userEnrollInClassDto);
  //}

  @Delete('remove-student-from-class')
  async removeStudentFromClass(
    @Body() removeStudentFromClassDto: RemoveStudentFromClassDto,
  ): Promise<Class> {
    return this.classService.removeStudentFromClass(removeStudentFromClassDto);
  }

  
  @Get('get-competition-board')
  async getCompetitionBoard(@Query() query: InfoSchoolDto): Promise<object> {
    //convert grade from string to integer as query param is always a string value
    query.grade = Number(query.grade);
    return this.classService.getCompetitionBoard(query);
  }
}
