import { AnimalRepository } from "../../animais/repositories/AnimalRepository";
import { ProprietarioRepository } from "../repositories/ProprietarioRepository";

export class DeleteProprietarioUseCase {
    constructor(
        private proprietarioRepository: ProprietarioRepository, 
        private animalRepository: AnimalRepository
    ) {}

    async execute(proprietarioId: number) {
        const animalsExists = await this.animalRepository.findByProprietarioId(proprietarioId);

        if (animalsExists.length > 0) {
            throw new Error("O Proprietario contém animais cadastrados!")
        }

        await this.proprietarioRepository.delete(proprietarioId);

    }
}