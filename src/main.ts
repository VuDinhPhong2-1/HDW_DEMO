import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // confg logger global
  const globalLogger = new Logger('Global');
  app.useLogger(globalLogger);

  //config swagger
  const config = new DocumentBuilder()
    .setTitle('Pets example')
    .setDescription('The pets API description')
    .setVersion('1.0')
    .addTag('pets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
  globalLogger.log('Application is running on: http://localhost:3000');
}
bootstrap();
