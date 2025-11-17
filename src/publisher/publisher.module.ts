import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Module({
  providers: [PublisherService],
  controllers: []
})
export class PublisherModule {}
