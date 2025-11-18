import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { pipeOptions } from './config/ValidatorPipeOptions';
import { swaggerConfig } from './config/SwaggerConfig';
import { SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { rabbitConfig } from 'src/config/RabbitConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(rabbitConfig);
  await app.startAllMicroservices();

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory());

  app.useGlobalPipes(new ValidationPipe(pipeOptions));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
