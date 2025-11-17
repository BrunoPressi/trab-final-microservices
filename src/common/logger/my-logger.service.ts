import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  /**
   * Log de informação geral
   * Use para registrar eventos normais do sistema
   */
  log(message: string, context?: string) {
    super.log(message, context || this.context || 'Application');
  }

  /**
   * Log de erros
   * Use para registrar erros e exceções
   */
  error(message: string, stack?: string, context?: string) {
    super.error(message, stack, context || this.context || 'Application');
  }

  /**
   * Log de avisos
   * Use para situações que merecem atenção mas não são erros
   */
  warn(message: string, context?: string) {
    super.warn(message, context || this.context || 'Application');
  }

  /**
   * Log de debug
   * Use para informações detalhadas durante desenvolvimento
   */
  debug(message: string, context?: string) {
    super.debug(message, context || this.context || 'Application');
  }

  /**
   * Log de informações verbosas
   * Use para informações muito detalhadas
   */
  verbose(message: string, context?: string) {
    super.verbose(message, context || this.context || 'Application');
  }
}