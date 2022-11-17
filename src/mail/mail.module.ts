import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport:
        'smtps://maksimkukushkin@inbox.ru:j3cdzqr6DBf4FDPjsFhQ@smtp.mail.ru',
      defaults: {
        from: '"Nest JS Robot" <maksimkukushkin@inbox.ru>',
      },
      template: {
        dir: join(__dirname, '../..', 'src/views/mailtemplates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
