import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendLogMessage(addressTo: string) {
    // console.log('Отправляется письмо установки');
    // console.log(__dirname);
    // console.log(join(__dirname, '../..', 'src/views/mailtemplates'));
    return this.mailerService
      .sendMail({
        to: addressTo,
        subject: 'Создание нового комментария',
        template: 'test',
      })
      .then((res) => {
        console.log('res ', res);
      })
      .catch((err) => {
        console.log('err ', err);
      });
  }
}
