import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsCPF } from '../../validators/cpf.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {

  @ApiProperty({
    description: 'CPF do cliente',
    example: '405.241.890-56'
  })
  @IsCPF()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'John Doe'
  })
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'john.doe@email.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone pessoal do cliente',
    example: '5554996322831'
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  telefone: string;
}
