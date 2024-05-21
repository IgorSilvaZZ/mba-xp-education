import { AnimalRepository } from "../repositories/AnimalRepository";

import { UpdateAnimalDTO } from "../dtos/UpdateAnimalDTO";

export class UpdateAnimalUseCase {
  constructor(private animalRepository: AnimalRepository) {}

  async execute(animalId: number, data: UpdateAnimalDTO) {
    const animalUpdated = await this.animalRepository.update(animalId, data);

    return animalUpdated;
  }
}
