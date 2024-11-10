import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './config/env.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const globalPrefix = configService.get(Env.API_PREFIX);
  app.setGlobalPrefix(globalPrefix);

  app.enableCors({
    origin: '*', // Allow all origins for development purposes only
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    forbidNonWhitelisted: true,
    transform: true,
    exceptionFactory: (errors) => {
      errors.forEach((error) => {
        const message = Object.values(error.constraints)[0];
        throw new BadRequestException(message);
      })
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('Fullstack SSE Assessment')
    .setDescription('The Fullstack SSE Assessment API description')
    .setVersion('1.0')
    .addTag('Default')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

  await app.listen(configService.get(Env.PORT));
}
bootstrap();
