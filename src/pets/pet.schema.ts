import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Pet extends Document {
  @ApiProperty({ description: 'The name of a pet', type: String })
  @Prop({ required: true })
  name: string;
  @ApiProperty({ description: 'The age of a pet', type: Number })
  @Prop()
  age: number;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
