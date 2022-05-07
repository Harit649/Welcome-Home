import * as dotenv from 'dotenv';
dotenv.config();

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './dispatchers/all-exception.filter';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true}); 
  const port = process.env.NODE_PORT || 3000;

  const logger = new Logger('bootstrap'); // global middleware...

  app.setGlobalPrefix('app');

  app.use(compression());
  
  app.use(helmet()); // global middleware...

  const config = new DocumentBuilder()
    .setTitle('Welcome-Home Admin API')
    .setDescription('The Admin API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .addTag('Admin API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  app.useGlobalFilters(new AllExceptionsFilter()); 
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  logger.log(`application start on ${port}`);
}
bootstrap();


