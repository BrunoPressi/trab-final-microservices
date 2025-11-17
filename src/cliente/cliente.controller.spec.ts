import { Test } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';

describe('ClienteController', () => {
  let clienteController: ClienteController;
  let clienteService: ClienteService;

  beforeEach(async () => {
    const mockClienteService = {
      findOne: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: mockClienteService
        }
      ],
    }).compile();

    clienteService = moduleRef.get<ClienteService>(ClienteService);
    clienteController = moduleRef.get<ClienteController>(ClienteController);
  });

  it('find one cliente', async () => {
    const cliente = {
      id: 1,
      cpf: '397.180.190-06',
      email: 'john.doe@email.com',
      nomeCompleto: 'John Doe',
      telefone: '5554996322831'
    };

    jest.spyOn(clienteService, 'findOne').mockResolvedValue(cliente);

    expect(await clienteController.findOne(1)).toBe(cliente);
    expect(clienteService.findOne).toHaveBeenCalled();
  });
});
