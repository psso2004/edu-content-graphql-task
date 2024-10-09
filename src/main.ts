import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin: string, pass) => {
      // 개발 환경이 아닐경우 모든 출처에 대한 cors 허용하지 않도록 수정필요.
      if (!origin || origin === 'https://studio.apollographql.com') {
        return void pass(null, true);
      } else {
        return void pass(new BadRequestException('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
