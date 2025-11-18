import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MyLoggerService } from 'src/common/logger/my-logger.service';
import { MailService } from 'src/mail/mail.service';

@Controller('subscriber')
export class SubscriberController {
  private readonly logger = new MyLoggerService(SubscriberController.name);

  constructor(private readonly mailService: MailService) {}

  /**
   * Event Pattern - Fire and Forget
   * Escuta eventos publicados na fila 'eventos_clientes'
   * Não retorna resposta ao publisher
   * Múltiplos subscribers podem receber a mesma mensagem
   */
  @EventPattern('eventos_clientes')
  async handleEvent(@Payload() event: { type: string; data: any; timestamp: string }) {
    this.logger.log(`📨 Evento recebido: ${event.type}`);

    await this.mailService.sendMail(event.data);
  }
}
