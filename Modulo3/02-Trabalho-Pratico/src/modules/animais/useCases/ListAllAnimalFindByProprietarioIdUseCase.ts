import { AnimalRepository } from "../repositories/AnimalRepository";

export class ListAllAnimalFindByProprietarioIdUseCase {
    constructor(private animalRepository: AnimalRepository) {}

    async execute(fkProprietario: number) {
        const animais = await this.animalRepository.findByProprietarioId(fkProprietario);

        return animais;
    }
}