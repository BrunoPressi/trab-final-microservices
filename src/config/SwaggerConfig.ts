import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Trabalho Final Disciplina Desenvolvimento de Apis e Micro Serviços')
  .setDescription('Desenvolvido por: Bruno Pressi')
  .setVersion('v1.0.0')
  .build();