import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validationError: {
        target: false,
      },
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  // app.engine(
  //   'hbs',
  //   expressHbs({
  //     layoutsDir: join(__dirname, '..', 'src/views/layouts'),
  //     defaultLayout: 'layout',
  //     extname: 'hbs',
  //   }),
  // );
  // hbs.registerPartials(__dirname + '/src/views/partials');

  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
