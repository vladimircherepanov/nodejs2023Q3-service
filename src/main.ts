import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //app.enableCors({ origin: 'http://localhost:4000' });

  await app.listen(process.env.PORT)
}
bootstrap();
