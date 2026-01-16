import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3001;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(port);

  Logger.log(`🚀 Aplikasi berjalan di http://localhost:${port}`, 'Bootstrap');
}
bootstrap().catch((err) => {
  console.error('Error saat menjalankan aplikasi:', err);
});
