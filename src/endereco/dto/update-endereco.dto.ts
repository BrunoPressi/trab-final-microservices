import { PartialType } from '@nestjs/swagger';
import { CreateEnderecoDto } from './create-endereco.dto';
import { IsEmpty } from 'class-validator';

export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {

  @IsEmpty()
  estado: string;

  @IsEmpty()
  cidade: string;

}
