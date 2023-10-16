import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors(CORS);
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));

  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
