import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe<T> implements PipeTransform<T> {
  constructor(private schema: ObjectSchema) {}

  transform(value: T, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(
        'Validation failed: ' + error.details.map((x) => x.message).join(', '),
      );
    }
    return value;
  }
}
