import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseClienteDto } from 'src/cliente/dto/response-cliente.dto';

@ApiExtraModels(ResponseClienteDto)
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @ApiOperation({ summary: 'Cadastrar novo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ResponseClienteDto)
        }
      ]
    }
  })
  @ApiResponse({ status: 409, description: 'Cliente já cadastrado',
    schema: {
      type: 'object',
      properties: {
        timestamp: { type: 'Date', example: new Date() },
        statusCode: { type: 'Number', example: 409 },
        statusMessage: { type: 'String', example: 'Cliente "ID" já cadastrado' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos',
    schema: {
      type: 'object',
      properties: {
        timestamp: { type: 'Date', example: new Date() },
        statusCode: { type: 'Number', example: 400 },
        statusMessage: { type: 'String', example: 'Bad request' },
        errors: { type: 'array', example: []}
      }
    }
  })
  @Post()
  async create(@Body() createClienteDto: CreateClienteDto) {
    return await this.clienteService.create(createClienteDto);
  }

  @ApiOperation({ summary: 'Buscar todos os clientes' })
  @ApiResponse({ status: 200, description: 'Clientes buscados com sucesso',
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ResponseClienteDto)
      }
    }
  })
  @ApiQuery({ name: 'pagina', description: 'Número da página', type: Number, example: 1 })
  @ApiQuery({ name: 'limite', description: 'Número de clientes por página', type: Number, example: 3 })
  @Get()
  async findAll(@Query('pagina') pagina=1, @Query('limite') limite=10) {
    return await this.clienteService.findAll(Number(pagina), Number(limite));
  }

  @ApiOperation({ summary: 'Buscar cliente por id' })
  @ApiResponse({ status: 200, description: 'Cliente buscado com sucesso',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ResponseClienteDto)
        }
      ]
    }
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado',
    schema:
      {
        type: 'object',
        properties: {
          timestamp: { type: 'Date', example: new Date() },
          statusCode: { type: 'Number', example: 404 },
          statusMessage: { type: 'String', example: 'Cliente "ID" não encontrado' }
        }
      }
  })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clienteService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ResponseClienteDto)
        }
      ]
    }
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado',
    schema:
      {
        type: 'object',
        properties: {
          timestamp: { type: 'Date', example: new Date() },
          statusCode: { type: 'Number', example: 404 },
          statusMessage: { type: 'String', example: 'Cliente "ID" não encontrado' }
        }
      }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos',
    schema: {
      type: 'object',
      properties: {
        timestamp: { type: 'Date', example: new Date() },
        statusCode: { type: 'Number', example: 400 },
        statusMessage: { type: 'String', example: 'Bad request' },
        errors: { type: 'array', example: []}
      }
    }
  })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateClienteDto: UpdateClienteDto) {
    return await this.clienteService.update(id, updateClienteDto);
  }

  @ApiOperation({ summary: 'Excluir cliente' })
  @ApiResponse({ status: 200, description: 'Cliente excluido com sucesso' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado',
    schema:
      {
        type: 'object',
        properties: {
          timestamp: { type: 'Date', example: new Date() },
          statusCode: { type: 'Number', example: 404 },
          statusMessage: { type: 'String', example: 'Cliente "ID" não encontrado' }
        }
      }
  })
  @ApiParam({ name: 'id', description: 'Id do cliente', type: Number, example: 1, required: true })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.clienteService.remove(id);
  }
}
