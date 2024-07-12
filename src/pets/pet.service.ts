import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './pet.schema';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private readonly petModel: Model<Pet>) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const createdPet = new this.petModel(createPetDto);
    return createdPet.save();
  }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findOne(id: string): Promise<Pet> {
    return this.petModel.findById(id).exec();
  }

  async update(updatePetDto: UpdatePetDto): Promise<Pet> {
    const { _id, ...updateData } = updatePetDto;
    return this.petModel
      .findByIdAndUpdate(_id, updateData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Pet> {
    return this.petModel.findOneAndDelete({ _id: id }).exec();
  }
}
