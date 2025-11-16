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

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.create(createClienteDto);
  }

  @Get()
  async findAll(@Query('pagina') pagina=1, @Query('limite') limite=10) {
    return await this.clienteService.findAll(Number(pagina), Number(limite));
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.clienteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.clienteService.remove(id);
  }
}
