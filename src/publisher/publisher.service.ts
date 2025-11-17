import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { MyLoggerService } from 'src/common/logger/my-logger.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class PublisherService implements OnModuleInit {

  private readonly logger = new MyLoggerService(PublisherService.name);
  private readonly client: ClientProxy;

  constructor() {
    // Configurar cliente RabbitMQ
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          // Coloque a url de conexão do rabbit aqui
          'amqps://bnkxpjfc:OzJrVEJxvvTScXw41yGIRIUFK4qFGfkG@hawk.rmq.cloudamqp.com/bnkxpjfc',
        ],
        queue: 'eventos_clientes',
        queueOptions: { durable: true }, // Fila persiste mesmo se broker reiniciar
      },
    });
  }

  async onModuleInit() {
    // Conectar ao RabbitMQ quando módulo iniciar
    await this.client.connect();
    this.logger.log('✅ Publisher conectado ao RabbitMQ');
  }

  /**
   * Event Pattern - Fire and Forget
   * Publica evento sem esperar resposta
   * Múltiplos subscribers podem receber a mesma mensagem
   */
  async publishEvent(eventType: string, data: any) {
    const event = {
      eventId: randomUUID(),
      type: eventType,
      data: data.email,
      timestamp: new Date().toISOString(),
    };

    this.logger.log(`📤 Publicando evento: ${eventType}`);

    // emit() não espera resposta (fire-and-forget)
    this.client.emit('eventos_clientes', event);

    return {
      success: true,
      message: `Evento ${eventType} publicado com sucesso`,
      event: event,
    };
  }

}
