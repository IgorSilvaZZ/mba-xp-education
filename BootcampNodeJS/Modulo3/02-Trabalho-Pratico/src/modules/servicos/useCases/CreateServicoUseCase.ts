import { ServicoRepository } from "../respositories/ServicoRepository";
import { CreateServicoDTO } from "../dtos/CreateServicoDTO";

export class CreateServicoUseCase {
  constructor(private servicoRepository: ServicoRepository) {}

  async execute(data: CreateServicoDTO) {
    const servico = await this.servicoRepository.create(data);

    return servico;
  }
}
