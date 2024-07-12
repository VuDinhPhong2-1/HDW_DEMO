import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export const CreatePetSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().optional(),
});

export class CreatePetDto {
  @ApiProperty({ description: 'The name of a pet', type: String })
  name: string;
  @ApiProperty({
    description: 'The age of a pet',
    minimum: 1,
    default: 1,
    type: Number,
  })
  age?: number;
}
