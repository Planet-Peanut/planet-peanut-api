import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgressSchema } from './schemas/progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Progress', schema: ProgressSchema }]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}