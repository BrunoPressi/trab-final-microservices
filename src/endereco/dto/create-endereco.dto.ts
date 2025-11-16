import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';

export class CreateEnderecoDto {

  @IsPostalCode('BR')
  cep: string;
  
  @IsNotEmpty()
  rua: string;
  
  @IsNotEmpty()
  bairro: string;
  
  @IsNumber()
  @IsNotEmpty()
  numero: number;
  
  @IsPhoneNumber('BR')
  telefone: string;

  @IsOptional()
  complemento?: string;

}
