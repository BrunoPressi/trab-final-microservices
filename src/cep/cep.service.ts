import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InvalidCepException } from 'src/exception/InvalidCepException';

@Injectable()
export class CepService {
  private axiosInstance = axios.create({
    timeout: 5000,
    family: 4,
  });

  async validarCep(cep: string) {
    try {
      const url = `https://viacep.com.br/ws/${cep}/json/`;
      const response = await this.axiosInstance.get(url);

      if (response.data?.erro) {
        throw new InvalidCepException('CEP inválido');
      }

      return response.data;
    } catch (error: any) {
      // Axios Error
      if (error.code === 'ETIMEDOUT') {
        throw new InvalidCepException(
          'Tempo de resposta excedido ao consultar o CEP.'
        );
      }

      if (error.code === 'ENETUNREACH') {
        throw new InvalidCepException(
          'Rede inacessível ao consultar o serviço de CEP.'
        );
      }

      if (error.response?.status === 400) {
        throw new InvalidCepException('CEP inválido.');
      }

      // Erro genérico
      throw new InvalidCepException(
        'Falha ao consultar o CEP. Tente novamente mais tarde.'
      );
    }
  }
}
