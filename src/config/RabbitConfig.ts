import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const rabbitConfig: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      // Coloque a url de conexão do rabbit aqui
      'amqps://bnkxpjfc:OzJrVEJxvvTScXw41yGIRIUFK4qFGfkG@hawk.rmq.cloudamqp.com/bnkxpjfc',
    ],
    queue: 'eventos_clientes',
    queueOptions: { durable: true }, // Deve ser igual ao publisher-service
  },
};