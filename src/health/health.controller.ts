import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    readonly healthService: HealthCheckService,
    readonly prismaService: PrismaService,
    readonly prismaHealth: PrismaHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthService.check([
      async () => this.prismaHealth.pingCheck('trab-mc-db', this.prismaService)
    ]);
  }
}
