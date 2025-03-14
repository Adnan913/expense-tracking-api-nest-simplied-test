import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  if (configService.get<string>('APP_ENV') === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Expense Tracker API')
      .setDescription('API for managing expenses and incomes')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT',
          in: 'header',
          description: 'Enter bearer token',
        },
        'bearerAuth',
      )
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(configService.get<number>('APP_PORT') || 8085);
}
bootstrap();
