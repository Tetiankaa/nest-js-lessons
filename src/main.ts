import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig, DatabaseConfig } from './configs/configs.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // instance of the Nest.js application

  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');

  const config = new DocumentBuilder() //Swagger documentation configuration
    .setTitle('Users')
    .setDescription('The Users API documentation')
    .setVersion('0.1.0')
    .addTag('users')
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
bootstrap();
