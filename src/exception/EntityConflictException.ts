import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityConflictException extends HttpException {
  constructor(message: string) {
    super(
      {
        timestamp: new Date(),
        statusCode: HttpStatus.CONFLICT,
        statusMessage: 'Conflict',
        message: message,
      },
      HttpStatus.CONFLICT
    );
  }
}