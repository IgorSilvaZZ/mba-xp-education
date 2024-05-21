import { AnimalRepository } from "../repositories/AnimalRepository";

export class ListAllAnimalUseCase {
  constructor(private animalRepository: AnimalRepository) {}

  async handle() {
    const animais = await this.animalRepository.getAll();

    return animais;
  }
}
