import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Progress } from './schemas/progress.schema';
import { Model } from 'mongoose';
import { UpdateProgressDto } from './dto/update-progress-dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<Progress>,
  ) {}

 
}
