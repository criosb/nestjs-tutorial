import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('dev'));
  app.enableCors(CORS);
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
