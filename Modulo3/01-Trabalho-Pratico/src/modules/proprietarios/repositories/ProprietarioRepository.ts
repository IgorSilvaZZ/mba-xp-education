import { CreateProprietarioDTO } from "../dtos/CreateProprietarioDTO";
import { UpdateProprietarioDTO } from "../dtos/UpdateProprietadioDTO";

import { Proprietario } from "../interfaces/Proprietario";

export abstract class ProprietarioRepository {
  abstract getAll(): Promise<Proprietario[]>;
  abstract getById(proprietarioId: number): Promise<Proprietario | null>;
  abstract create(data: CreateProprietarioDTO): Promise<Proprietario>;
  abstract update(
    proprietarioId: number,
    data: UpdateProprietarioDTO
  ): Promise<Proprietario>;
  abstract delete(proprietarioId: number): Promise<void>;
}
