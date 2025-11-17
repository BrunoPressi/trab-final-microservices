import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters, Query,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @ApiOperation({ summary: 'Cadastrar novo endereço para um cliente' })
  @ApiResponse({ status: 201, description: 'Endereço cadastrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiResponse({ status: 404, description: 'CEP inválido (não encontrado)' })
  @ApiResponse({ status: 409, description: 'Endereço já cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Post(':id')
  async create(@Body() createEnderecoDto: CreateEnderecoDto, @Param('id') clienteId: number) {
    return await this.enderecoService.create(createEnderecoDto, clienteId);
  }

  @ApiOperation({ summary: 'Buscar todos os endereços de um cliente' })
  @ApiResponse({ status: 200, description: 'Endereços buscados com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado' })
  @ApiQuery({ name: 'pagina', description: 'Número da página', type: Number, example: 1 })
  @ApiQuery({ name: 'limite', description: 'Número de endereços por página', type: Number, example: 1 })
  @ApiParam({ name: 'clienteId', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Get('cliente/:clienteId')
  async findAll(@Param('clienteId') clienteId: number, @Query('pagina') pagina=1, @Query('limite') limite=10) {
    return await this.enderecoService.findAll(clienteId, Number(pagina), Number(limite));
  }

  @ApiOperation({ summary: 'Buscar endereço por id' })
  @ApiResponse({ status: 200, description: 'Endereço buscado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  @ApiParam({ name: 'id', description: 'Id do endereço', type: Number, example: 1, required: true })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enderecoService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar endereço' })
  @ApiResponse({ status: 200, description: 'Endereço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'Id do endereço', type: Number, example: 1, required: true })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecoService.update(id, updateEnderecoDto);
  }

  @ApiOperation({ summary: 'Deletar um endereço' })
  @ApiResponse({ status: 200, description: 'Endereço deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Endereço não encontrado' })
  @ApiParam({ name: 'id', description: 'Id do endereço', type: Number, example: 1, required: true })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.enderecoService.remove(id);
  }
}
