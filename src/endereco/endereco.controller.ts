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

@Controller('endereco')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post(':id')
  async create(@Body() createEnderecoDto: CreateEnderecoDto, @Param('id') clienteId: number) {
    return await this.enderecoService.create(createEnderecoDto, clienteId);
  }

  @Get('cliente/:clienteId')
  async findAll(@Param('clienteId') clienteId: number, @Query('pagina') pagina=1, @Query('limite') limite=10) {
    return await this.enderecoService.findAll(clienteId, Number(pagina), Number(limite));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.enderecoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecoService.update(id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.enderecoService.remove(id);
  }
}
