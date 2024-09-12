import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { RunService } from './run.service';
import { Run } from './schemas/run.schema';
import { CreateRunDto } from './dto/create-run.dto';
import { FindUserNameDto } from '../users/dto/find-user-name.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('run')
@Controller('api/run')
export class RunController {
  constructor(private readonly runService: RunService) {}

  @Post('upload-run')
  async uploadRun(@Body() createRunDto: CreateRunDto): Promise<Run> {
    return this.runService.createRun(createRunDto);
  }
  @Get('user-runs')
  async countRun(@Query() userDto: FindUserNameDto): Promise<number> {
    return this.runService.getTotalRuns(userDto)
}

  @Get('problem-solved/user')
  async countProblemSolved(@Query() userDto: FindUserNameDto): Promise<number> {
    return this.runService.getProblemSolved(userDto);
}
}
