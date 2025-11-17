import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { MyLoggerService } from '../logger/my-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  constructor(private readonly logger: MyLoggerService) {
    this.logger.setContext('HTTP');
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    // Obtém informações da requisição HTTP
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    // Registra início da requisição
    this.logger.log(`→ ${method} ${url}`, 'HTTP');

    return next.handle().pipe(
      tap({
        // Quando requisição é bem-sucedida
        next: () => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const time = Date.now() - now;

          this.logger.log(
            `← ${method} ${url} ${statusCode} - ${time}ms`,
            'HTTP',
          );
        },
        // Quando requisição falha
        error: (error) => {
          const time = Date.now() - now;
          const statusCode = error.status || 500;

          this.logger.error(
            `${method} ${url} ${statusCode} - ${time}ms - ${error.message}`,
            error.stack,
            'HTTP',
          );
        },
      }),
    );
  }
}