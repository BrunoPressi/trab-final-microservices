import { ValidationError, ValidatorOptions } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export interface ValidatorPipeOptions extends ValidatorOptions {
  whitelist?: boolean;
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
  forbidNonWhitelisted?: boolean;
  forbidUnknownValues?: boolean;
  stopAtFirstError?: boolean;
  enableImplicitConversion?: boolean;
}

export const pipeOptions: ValidatorPipeOptions = {
  whitelist: true,
  transform: true,
  disableErrorMessages: false,
  forbidNonWhitelisted: true,
  forbidUnknownValues: true,
  stopAtFirstError: false,
  enableImplicitConversion: true,
  exceptionFactory: (errors) => {
    return new BadRequestException({
      timestamp: new Date(),
      statusCode: 400,
      message: 'Bad Request',
      errors: errors.map(err => ({
        field: err.property,
        issues: Object.values(err.constraints || {}),
      })),
    });
  },
}
