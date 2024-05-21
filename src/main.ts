import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // instance of the Nest.js application

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
    swaggerOptions: {
      persistAuthorization: true,
    },
  }); // setting up the Swagger documentation

  await app.listen(3000, '0.0.0.0', () => {
    console.log('Server running at http://0.0.0.0:3000');
    console.log('Swagger running at http://0.0.0.0:3000/docs');
  });
}
bootstrap();
