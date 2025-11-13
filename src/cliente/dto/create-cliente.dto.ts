import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsCPF } from '../../validators/cpf.validator';

export class CreateClienteDto {

  @IsCPF()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  telefone: string;
}
