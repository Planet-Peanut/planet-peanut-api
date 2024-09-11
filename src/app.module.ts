import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RunModule } from './run/run.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassModule } from './class/class.module';
import { SchoolModule } from './school/school.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        console.log('Current NODE_ENV:', process.env.NODE_ENV);
        const uri = isProduction
          ? configService.get<string>('MONGO_DB_URI_PROD')
          : configService.get<string>('MONGO_DB_URI_DEV');
        return { uri };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    RunModule,
    TeacherModule,
    ClassModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
