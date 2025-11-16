import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InvalidCepException } from 'src/exception/InvalidCepException';

@Injectable()
export class CepService {
  async validarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await axios.get(url);

    if (response.data.erro) {
      throw new InvalidCepException('CEP inválido');
    }

    return response.data;
  }

}
