import { ApiProperty } from '@nestjs/swagger';

export class ResponseClienteDto {

  @ApiProperty({
    description: 'Id do cliente',
    example: 1
  })
  id: number

  @ApiProperty({
    description: 'CPF do cliente',
    example: '405.241.890-56'
  })
  cpf: string;

  @ApiProperty({
    description: 'Nome completo do cliente',
    example: 'John Doe'
  })
  nomeCompleto: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'john.doe@email.com'
  })
  email: string

  @ApiProperty({
    description: 'Telefone pessoal do cliente',
    example: '5554996322831'
  })
  telefone: string;
}