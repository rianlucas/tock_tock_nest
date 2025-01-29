import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private zodSchema: ZodSchema) {}

  transform(value: any) {
    try {
      this.zodSchema.parse(value);
    } catch (exception: unknown) {
      throw exception;
    }
  }
}
