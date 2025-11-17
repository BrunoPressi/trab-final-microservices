import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';

export class ResponseEnderecoDto {

  @ApiProperty({
    description: 'Id do endereço',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'CEP brasileiro',
    example: '99265000'
  })
  cep: string;

  @ApiProperty({
    description: 'Rua do endereço',
    example: 'Avenida 20 de Março'
  })
  rua: string;

  @ApiProperty({
    description: 'Bairro do endereço',
    example: 'Centro'
  })
  bairro: string;

  @ApiProperty({
    description: 'Número do endereço',
    example:  570
  })
  numero: number;

  @ApiProperty({
    description: 'Telefone do endereço',
    example: '5554996322831'
  })
  telefone: string;

  @ApiProperty({
    description: 'Complemento do endereço (casa, apartamento, bloco, etc',
    example: 'Casa'
  })
  complemento?: string;
}