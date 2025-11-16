import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCepException extends HttpException {
  constructor(message: string) {
    super(
      {
        timestamp: new Date(),
        statusCode: HttpStatus.NOT_FOUND,
        statusMessage: 'Not Found',
        message: message,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}