import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const UpdatePetSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().optional(),
  age: Joi.number().integer().optional(),
});

export class UpdatePetDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  readonly name?: string;
  @ApiProperty()
  readonly age?: number;
}
