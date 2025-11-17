import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import dotenv from 'dotenv';
import { env } from 'prisma/config';
import { MyLoggerService } from 'src/common/logger/my-logger.service';

dotenv.config({
  path: './.env',
});

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env('MAIL_HOST'),
        port: 587,
        secure: false,
        auth: {
          user: env("MAIL_USER"),
          pass: env('MAIL_PASSWORD'),
        },
      },
      defaults: {
        from: '"System" <brunopressi2012@gmail.com>',
      },
    }),
  ],
  providers: [MailService, MyLoggerService],
})
export class MailModule {}
