import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';
import { MyLoggerService } from '../logger/my-logger.service';

@Controller('health')
export class HealthController {
  constructor(
    private healthService: HealthCheckService,
    private prismaService: PrismaService,
    private prismaHealth: PrismaHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private logger: MyLoggerService,
  ) {}

  /**
   * Health check completo
   * Verifica memória, disco e outras dependências
   */
  @Get()
  @HealthCheck()
  check() {
    this.logger.log('Health check executado', 'HealthCheck');

    return this.healthService.check([
      // Verifica uso de memória (alerta se acima de 300MB)
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),

      // Verifica uso de memória RSS (alerta se acima de 300MB)
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),

      // Verifica espaço em disco (alerta se acima de 90%)
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          thresholdPercent: 0.9,
        }),
    ]);
  }

  /**
   * Liveness probe
   * Verifica se aplicação está viva (rodando)
   * Kubernetes usa isso para reiniciar containers
   */
  @Get('live')
  @HealthCheck()
  liveness() {
    return this.healthService.check([
      () => ({
        app: {
          status: 'up',
        },
      }),
    ]);
  }

  /**
   * Readiness probe
   * Verifica se aplicação está pronta para receber tráfego
   * Kubernetes usa isso para rotear tráfego
   */
  @Get('ready')
  @HealthCheck()
  readiness() {
    return this.healthService.check([
      () => ({
        app: {
          status: 'up',
        },
      }),
    ]);
  }
}
