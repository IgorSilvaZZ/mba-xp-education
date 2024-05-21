import { ProprietarioRepository } from "../repositories/ProprietarioRepository";

export class ListAllProprietariosUseCase {
  constructor(private proprietarioRepository: ProprietarioRepository) {}

  async execute() {
    const proprietarios = await this.proprietarioRepository.getAll();

    return proprietarios;
  }
}
