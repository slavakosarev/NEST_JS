import { NestFactory } from '@nestjs/core';
import { NewsModule } from './news.module';

async function bootstrap() {
  const app = await NestFactory.create(NewsModule);
  await app.listen(3000);
}
bootstrap();
