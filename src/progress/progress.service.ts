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
export class ProgressService{
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<Progress>,
  ) {}

  async userProgress(username: string): Promise<Record<string, any>> {
    const userName = await this.progressModel.findOne({ username });
    if (!userName) {
      throw new NotFoundException("username doesn't exists");
    } else {
      try {
        const progressDocs = await this.progressModel.find({ username }).lean();
        const advancement = {};
        if (progressDocs.length > 0) {
          progressDocs.map((progress) => {
            advancement[progress.circleID] = {
              open: progress.open,
              n: progress.n,
              completed: progress.completed,
              initialScrollIndex: {},
            };
          })
          return advancement;
        } 
      } catch {
        return new InternalServerErrorException('Server Error');
      }}
    
  }

  async updateAdvancement(updateProgressDto: UpdateProgressDto) {

    const { circleID, newContext, username } = updateProgressDto;
    if (!circleID || !newContext || !username) {
      throw new BadRequestException('Request body is not validated')
    }

    const nextCircle = {};
    for (const key in newContext) {
      if (newContext[key].n === 0) {
        nextCircle[key] = newContext[key];
        break;
      }
    }

    //remove unnecessary keys from newContext
    const keysToRemove = ['currentSubject', 'initialScrollIndex'];

     const filteredContext=Object.assign( {[circleID]:newContext[circleID]}, nextCircle)

     const updatedNeContext = Object.keys(newContext).reduce((accu, curr) => {
      if (!keysToRemove.includes(curr)) {
accu[curr]=newContext[curr],
}
return accu;
     },{})
  }
}
