import { AnimalRepository } from "../repositories/AnimalRepository";

import { CreateAnimalDTO } from "../dtos/CreateAnimalDTO";

export class CreateAnimalUseCase {
  constructor(private animalRepository: AnimalRepository) {}

  async execute(data: CreateAnimalDTO) {
    const animal = await this.animalRepository.create(data);

    return animal;
  }
}
