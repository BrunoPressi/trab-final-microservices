import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MyLoggerService } from 'src/common/logger/my-logger.service';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService, private readonly loggerService: MyLoggerService) {}

  async sendMail(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Bem-vindo ${email}!`,
      text: 'Obrigado por ter feito o cadastro em nosso sistema!'
    });
    this.loggerService.log(`📧 Email enviado ${email} `)
  }

}
