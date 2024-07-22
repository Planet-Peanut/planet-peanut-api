import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('school')
@Controller('api/school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post('add-school')
  async addSchool(@Body() createSchoolDto: any): Promise<any> {
    return this.schoolService.addSchool(createSchoolDto);
  }

  @Get('list-of-schools')
  async listOfSchool(): Promise<any> {
    return this.schoolService.listOfSchool();
  }
}
