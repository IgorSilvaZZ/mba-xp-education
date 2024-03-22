import { AnimalRepository } from "../repositories/AnimalRepository";

export class FindByIdAnimalUseCase {
    constructor(private animalRepository: AnimalRepository) {}

    async execute(animalId: number) {

        const animal = await this.animalRepository.findById(animalId);

        return animal;

    }
}