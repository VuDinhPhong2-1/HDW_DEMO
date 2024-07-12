import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { PetsService } from './pet.service';
import { CreatePetDto, CreatePetSchema } from './dto/create-pet.dto';
import { Pet } from './pet.schema';
import { UpdatePetDto, UpdatePetSchema } from './dto/update-pet.dto';
import { JoiValidationPipe } from 'src/comon/pipes/joi-validation.pipe';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('pets')
@Controller('pets')
export class PetController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(CreatePetSchema))
  async create(@Body() createPetDto: CreatePetDto): Promise<Pet> {
    return this.petsService.create(createPetDto);
  }

  @Put()
  @UsePipes(new JoiValidationPipe(UpdatePetSchema))
  async update(@Body() updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.petsService.update(updatePetDto);
  }

  @Get(':id')
  async getOnePet(@Param('id') id: string): Promise<Pet> {
    return this.petsService.findOne(id);
  }

  @Delete(':id')
  async deletePet(@Param('id') id: string): Promise<{ message: string }> {
    await this.petsService.remove(id);
    return { message: `Pet with id ${id} has been deleted` };
  }
}
