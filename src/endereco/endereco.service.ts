import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CepService } from '../cep/cep.service';
import { ClienteService } from '../cliente/cliente.service';
import { GenericException } from '../exception/GenericException';
import { EntityConflictException } from '../exception/EntityConflictException';
import { EntityNotFoundException } from '../exception/EntityNotFoundException';

@Injectable()
export class EnderecoService {
  constructor(
    readonly prismaService: PrismaService,
    readonly cepService: CepService,
    readonly clienteService: ClienteService
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto, clienteId: number) {
    try {
      await this.clienteService.findOne(clienteId);

      const dataCep = await this.cepService.validarCep(createEnderecoDto.cep);

      return await this.prismaService.endereco.create({
        data: {
          cep: createEnderecoDto.cep,
          estado: dataCep.estado,
          cidade: dataCep.localidade,
          rua: createEnderecoDto.rua,
          bairro: createEnderecoDto.bairro,
          numero: createEnderecoDto.numero,
          telefone: createEnderecoDto.telefone,
          complemento: createEnderecoDto.complemento,
          clienteId: clienteId
        },
        include: {
          cliente: true
        }
      });
    }
    catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw error;
      }
      if (error.code === 'P2002') {
        throw new EntityConflictException('Endereço já cadastrado');
      }
      throw new GenericException('Erro interno no banco de dados');
    }
  }

  async findAll(clienteId: number, pagina: number, limite: number) {
    try {
      await this.clienteService.findOne(clienteId);

      const skip = (pagina - 1) * limite;

      const enderecos = await this.prismaService.endereco.findMany(
        {
          where: {clienteId},
          skip,
          take: limite,
          orderBy: {id: 'asc'}
        }
      );

      const total = await this.prismaService.endereco.count({
        where: {clienteId: clienteId}
      });

      return {
        data: enderecos,
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite)
      }
    }
    catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw error;
      }
      throw new GenericException('Erro interno no banco de dados');
    }
  }

  async findOne(id: number) {
    try {
      const endereco = await this.prismaService.endereco.findUniqueOrThrow(
        {
          where: {id: id},
          include: {cliente: true}
        }
      );

      return endereco;
    }
    catch (error) {
      if (error.code === 'P2025') {
        throw new EntityNotFoundException(`Endereço ${id} não encontrado`)
      }
      throw new GenericException('Erro interno no banco de dados');
    }
  }

  async update(id: number, updateEnderecoDto: UpdateEnderecoDto) {
    try {
      const enderecoVelho = await this.findOne(id);

      if (enderecoVelho.cep != updateEnderecoDto.cep) {
        const dataCep = await this.cepService.validarCep(updateEnderecoDto.cep!);

        updateEnderecoDto.estado = dataCep.estado;
        updateEnderecoDto.cidade = dataCep.localidade;
      }

      const endereco = await this.prismaService.endereco.update(
        {
          where: {id: id},
          data: updateEnderecoDto
        }
      )

      return endereco;
    }
    catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);

      await this.prismaService.endereco.delete(
        {
          where: {id: id}
        }
      )
    }
    catch (error) {
      throw error;
    }
  }
}
