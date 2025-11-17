import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {

  @ApiProperty({
    description: 'CEP brasileiro',
    example: '99265000'
  })
  @IsPostalCode('BR')
  cep: string;

  @ApiProperty({
    description: 'Rua do endereço',
    example: 'Avenida 20 de Março'
  })
  @IsNotEmpty()
  rua: string;

  @ApiProperty({
    description: 'Bairro do endereço',
    example: 'Centro'
  })
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({
    description: 'Número do endereço',
    example:  570
  })
  @IsNumber()
  @IsNotEmpty()
  numero: number;

  @ApiProperty({
    description: 'Telefone do endereço',
    example: '5554996322831'
  })
  @IsPhoneNumber('BR')
  telefone: string;

  @ApiProperty({
    description: 'Complemento do endereço (casa, apartamento, bloco, etc',
    example: 'Casa'
  })
  @IsOptional()
  complemento?: string;

}
