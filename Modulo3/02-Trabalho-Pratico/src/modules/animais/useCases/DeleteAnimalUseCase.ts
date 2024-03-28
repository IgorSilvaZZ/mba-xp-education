import { AnimalRepository } from "../repositories/AnimalRepository";

export class DeleteAnimalUseCase {
    constructor(private animalRepository: AnimalRepository) {}

    async execute(animalId: number) {
        await this.animalRepository.delete(animalId);
    }
}