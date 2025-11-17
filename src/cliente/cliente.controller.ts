import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @ApiOperation({ summary: 'Cadastrar novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Cliente já cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.create(createClienteDto);
  }

  @ApiOperation({ summary: 'Buscar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Clientes buscados com sucesso' })
  @ApiQuery({ name: 'pagina', description: 'Número da página', type: Number, example: 1 })
  @ApiQuery({ name: 'limite', description: 'Número de clientes por página', type: Number, example: 3 })
  @Get()
  async findAll(@Query('pagina') pagina=1, @Query('limite') limite=10) {
    return await this.clienteService.findAll(Number(pagina), Number(limite));
  }

  @ApiOperation({ summary: 'Buscar cliente por id' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.clienteService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return await this.clienteService.update(id, updateClienteDto);
  }

  @ApiOperation({ summary: 'Excluir cliente' })
  @ApiResponse({ status: 200, description: 'Cliente excluido com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.clienteService.remove(id);
  }
}
