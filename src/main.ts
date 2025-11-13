import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { pipeOptions } from './config/ValidatorPipeOptions';
import { swaggerConfig } from './config/SwaggerConfig';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory());
  app.useGlobalPipes(new ValidationPipe(pipeOptions));
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
