import { HttpException, HttpStatus } from '@nestjs/common';

export class GenericException extends HttpException {
  constructor(message: string) {
    super(
      {
        timestamp: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        statusMessage: 'Internal Server Error',
        message: message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}