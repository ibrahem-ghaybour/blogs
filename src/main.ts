import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: '*', // يمكنك استبداله بـ ['http://localhost:3000'] للسماح فقط للفرونت إند
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // تأكد من دعم الكوكيز أو التوكن
  });
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
