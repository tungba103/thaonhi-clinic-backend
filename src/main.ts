import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';

const PORT = 9100;
const GLOBAL_PREFIX = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);
  setupOpenApi(app);

  await app.listen(PORT);
  console.log(
    `Application is running on: http://localhost:${PORT}/${GLOBAL_PREFIX}`,
  );

  console.log(
    `Application swagger is running on: http://localhost:${PORT}/swagger`,
  );
}

function setupOpenApi(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('O2 SKIN API')
    .setDescription('NestJS application for O2 Skin Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
