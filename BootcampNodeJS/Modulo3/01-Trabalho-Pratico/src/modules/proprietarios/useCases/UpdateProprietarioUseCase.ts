import { UpdateProprietarioDTO } from "../dtos/UpdateProprietadioDTO";
import { ProprietarioRepository } from "../repositories/ProprietarioRepository";

export class UpdateProprietarioUseCase {
  constructor(private proprietarioRepository: ProprietarioRepository) {}

  async execute(proprietarioId: number, data: UpdateProprietarioDTO) {
    const updateProprietario = await this.proprietarioRepository.update(
      proprietarioId,
      data
    );

    return updateProprietario;
  }
}
