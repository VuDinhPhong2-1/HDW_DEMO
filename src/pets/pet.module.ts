import { PetsService } from './pet.service';
import { PetController } from './pet.controller';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from './pet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }])],
  controllers: [PetController],
  providers: [PetsService],
})
export class PetModule {}
