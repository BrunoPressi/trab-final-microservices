import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ClienteModule } from './cliente/cliente.module';
import { EnderecoModule } from './endereco/endereco.module';
import { CepModule } from './cep/cep.module';
import { HealthModule } from 'src/common/health/health.module';
import { MyLoggerService } from './common/logger/my-logger.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [PrismaModule, ClienteModule, EnderecoModule, CepModule, HealthModule],
  controllers: [],
  providers: [
    // Registrar logger como provider global
    MyLoggerService,
    // Registrar interceptor global
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
