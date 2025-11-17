import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClienteModule } from './cliente/cliente.module';
import { EnderecoModule } from './endereco/endereco.module';
import { CepModule } from './cep/cep.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PrismaModule, ClienteModule, EnderecoModule, CepModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
