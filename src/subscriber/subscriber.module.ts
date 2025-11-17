import { Module } from '@nestjs/common';
import { SubscriberController } from './subscriber.controller';
import { MailService } from 'src/mail/mail.service';
import { MyLoggerService } from 'src/common/logger/my-logger.service';

@Module({
  controllers: [SubscriberController],
  providers: [MailService, MyLoggerService]
})
export class SubscriberModule {}
