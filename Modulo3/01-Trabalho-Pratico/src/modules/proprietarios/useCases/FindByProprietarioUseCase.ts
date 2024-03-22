import { ProprietarioRepository } from "../repositories/ProprietarioRepository";

export class FindByProprietarioUseCase {
  constructor(private proprietarioRepository: ProprietarioRepository) {}

  async execute(proprietarioId: number) {
    const proprietario = await this.proprietarioRepository.getById(
      proprietarioId
    );

    return proprietario;
  }
}
