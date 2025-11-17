import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EntityConflictException } from '../exception/EntityConflictException';
import { GenericException } from '../exception/GenericException';
import { EntityNotFoundException } from '../exception/EntityNotFoundException';
import { PublisherService } from 'src/publisher/publisher.service';
import { Cliente } from '@prisma/client';

@Injectable()
export class ClienteService {

  constructor(private prismaService: PrismaService, private publisherService: PublisherService) {}

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente: Cliente = await this.prismaService.cliente.create({ data: createClienteDto });

      await this.publisherService.publishEvent('cliente_cadastrado', createClienteDto);
      return cliente
    }
    catch (error) {
      if (error.code === 'P2002') {
        throw new EntityConflictException('Cliente já cadastrado');
      }
      throw new GenericException('Erro interno no banco de dados');
    }
  }

  async findAll(pagina: number, limite: number) {
    try {
      const skip = (pagina - 1) * limite;

      const clientes =  await this.prismaService.cliente.findMany({
        skip,
        take: limite,
        orderBy: { id: 'asc' }
      });

      const total = await this.prismaService.cliente.count();

      return {
        data: clientes,
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
      };
    }
    catch (error) {
      throw new GenericException('Erro interno no banco de dados');
    }
  }

  async findOne(id: number) {
    try {
      const cliente = await this.prismaService.cliente.findUniqueOrThrow({
        where: {
          id: id
        }
      });
      return cliente
    }
    catch (error) {
      if (error.code === 'P2025') {
        throw new EntityNotFoundException(`Cliente ${id} não encontrado`);
      }
      throw new GenericException('Erro interno no banco de dados');
    }
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    try {
      const cliente = await this.findOne(id);

      cliente.nomeCompleto = updateClienteDto.nomeCompleto;
      cliente.email = updateClienteDto.email;
      cliente.telefone = updateClienteDto.telefone;

      return await this.prismaService.cliente.update({
        data: cliente,
        where: {
          id: id
        }
      });
    }
    catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      await this.prismaService.cliente.delete({
        where: {
          id: id
        }
      });
    }
    catch (error) {
      throw error;
    }
  }
}
