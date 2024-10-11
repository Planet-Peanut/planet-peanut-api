import { Controller, Put,Post ,Get, Param, Body } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ApiTags } from '@nestjs/swagger';
import {UpdateProgressDto} from './dto/update-progress.dto'
import {Progress} from './schemas/progress.schema'
@ApiTags('progress')
@Controller('api/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}  
  //Get progress details for a psecific user
  @Get(':username')
  async userProgress(
    @Param('username') username: string,
  ): Promise<Record<string, any>> {
    return this.progressService.userProgress(username)
  }

  // Update Progress details for a user
  @Put('update-advancement')
  async updateAdvancement(
    @Body() updateProgressDto: UpdateProgressDto,
  ): Promise<Progress> {
    return this.progressService.updateAdvancement(updateProgressDto);
  }

}