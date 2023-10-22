import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ZodError, ZodObject } from 'nestjs-zod/z';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (metadata.type === 'body') {
        this.schema.parse(value);
      }
    } catch (error: unknown) {
      console.log({ error });
      if (error instanceof ZodError)
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: error.issues.map((i) => ({
            field: i.path[0],
            message: i.message,
          })),
        });
    }
    return value;
  }
}
