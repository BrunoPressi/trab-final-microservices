import { Module } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { EnderecoController } from './endereco.controller';
import { PrismaService } from '../prisma/prisma.service';
import { CepService } from '../cep/cep.service';
import { ClienteService } from '../cliente/cliente.service';
import { PublisherService } from 'src/publisher/publisher.service';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService, PrismaService, CepService, ClienteService, PublisherService],
})
export class EnderecoModule {}
