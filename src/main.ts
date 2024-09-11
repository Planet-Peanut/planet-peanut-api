import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Planet Peanut API')
    .setDescription(
      'This project is a simple API built with NestJS and MongoDB Atlas for managing users. It is a simple CRUD API for an app called "Planet Peanut"',
    )
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //Log to check which ENV is loading and DB URI
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('MongoDB URI:', process.env.MONGO_DB_URI_PROD);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
