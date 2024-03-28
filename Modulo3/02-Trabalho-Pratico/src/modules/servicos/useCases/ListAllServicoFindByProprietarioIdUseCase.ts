import { ServicoRepository } from "../respositories/ServicoRepository";

export class ListAllServicoFindByProprietarioIdUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute(proprietarioId: number) {
    const servicos = await this.servicoRepository.findByProprietarioId(
      proprietarioId
    );

    return servicos;
  }
}
