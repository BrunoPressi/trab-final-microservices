import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    clienteService = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined()
    expect(clienteService).toBeDefined();
  });
});
