import { CreateProprietarioDTO } from "../dtos/CreateProprietarioDTO";
import { ProprietarioRepository } from "../repositories/ProprietarioRepository";

export class CreateProprietarioUseCase {
  constructor(private proprietarioRepository: ProprietarioRepository) {}

  async execute(data: CreateProprietarioDTO) {
    const proprietario = await this.proprietarioRepository.create(data);

    return proprietario;
  }
}
