import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from "@nestjs/common";

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true}))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then((): void => console.log(`the application is running on port 3000`));
