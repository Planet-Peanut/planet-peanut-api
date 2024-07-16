import { Module } from '@nestjs/common';
import { RunService } from './run.service';
import { RunController } from './run.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RunSchema } from './schemas/run.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Run', schema: RunSchema }])],
  providers: [RunService],
  controllers: [RunController],
})
export class RunModule {}
