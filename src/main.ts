import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/http/global-exception.filter';
import { AppConfig } from './configs/configs.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // instance of the Nest.js application

  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');

  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
  app.useGlobalFilters(new GlobalExceptionFilter());
  const config = new DocumentBuilder() //Swagger documentation configuration
    .setTitle('Users')
    .setDescription('The Users API documentation')
    .setVersion('0.1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config); //Swagger documentation
  SwaggerModule.setup('docs', app, document, {
    // setting up the Swagger documentation
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      defaultModelsExpandDepth: 2,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(appConfig.port, appConfig.host, () => {
    console.log(`Server running at http://${appConfig.host}:${appConfig.port}`);
    console.log(
      `Swagger running at http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
}
void bootstrap();
