import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS untuk frontend React (localhost:5173 Vite default)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🐾 Backend JadwalMakanHewan berjalan di: http://localhost:${port}`);
}
bootstrap();

