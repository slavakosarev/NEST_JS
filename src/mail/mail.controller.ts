import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Get()
  async sendCommentEmail() {
    return await this.mailService.sendLogMessage('maksimkukushkin@inbox.ru');
  }
}
