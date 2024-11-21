import { Controller } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('progress')
@Controller('api/progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}
}
