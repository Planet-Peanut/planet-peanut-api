import { Controller, Body, Post } from '@nestjs/common';
import { RunService } from './run.service';
import { Run } from './schemas/run.schema';
import { CreateRunDto } from './dto/create-run.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('run')
@Controller('api/run')
export class RunController {
  constructor(private readonly runService: RunService) {}

  @Post('upload-run')
  async uploadRun(@Body() createRunDto: CreateRunDto): Promise<Run> {
    return this.runService.createRun(createRunDto);
  }
}
