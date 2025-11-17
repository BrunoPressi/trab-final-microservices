import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PublisherService } from 'src/publisher/publisher.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, PrismaService, PublisherService],
})
export class ClienteModule {}
