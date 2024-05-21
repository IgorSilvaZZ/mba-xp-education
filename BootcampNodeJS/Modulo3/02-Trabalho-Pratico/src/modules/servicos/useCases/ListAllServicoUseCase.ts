import { ServicoRepository } from "../respositories/ServicoRepository";

export class ListAllServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute() {
    const servicos = await this.servicoRepository.getAll();

    return servicos;
  }
}
