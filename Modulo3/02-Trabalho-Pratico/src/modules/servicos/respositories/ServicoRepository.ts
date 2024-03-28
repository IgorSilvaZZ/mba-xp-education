import { Servico } from "../interfaces/Servico";

import { CreateServicoDTO } from "../dtos/CreateServicoDTO";

export abstract class ServicoRepository {
  abstract create(data: CreateServicoDTO): Promise<Servico>;
  abstract getAll(): Promise<Servico[]>;
  abstract findByProprietarioId(fkProprietario: number): Promise<Servico[]>;
}
