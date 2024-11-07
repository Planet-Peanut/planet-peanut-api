import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from './schemas/class.schema';
import { RunSchema } from 'src/run/schemas/run.schema';
import { ClassController } from './class.controller';
import { UserSchema } from 'src/users/schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Class', schema: ClassSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Run', schema: RunSchema },
    ]),
  ],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
