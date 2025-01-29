import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/filters/http-exception.filter';
import { ZodExceptionFilter } from './global/filters/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new ZodExceptionFilter());
  await app.listen(3000);
}
bootstrap();
