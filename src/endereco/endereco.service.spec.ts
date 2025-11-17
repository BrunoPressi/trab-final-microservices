import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoService } from './endereco.service';
import { ClienteService } from '../cliente/cliente.service';
import { CepService } from '../cep/cep.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EnderecoService', () => {
  let enderecoService: EnderecoService;
  let clienteService: ClienteService;
  let cepService: CepService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnderecoService, ClienteService, CepService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    cepService = module.get<CepService>(CepService);
    clienteService = module.get<ClienteService>(ClienteService);
    enderecoService = module.get<EnderecoService>(EnderecoService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined()
    expect(cepService).toBeDefined();
    expect(clienteService).toBeDefined();
    expect(enderecoService).toBeDefined();
  });
});
