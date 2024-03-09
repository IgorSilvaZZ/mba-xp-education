import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import { Solicitation } from "../../../domains/entities/Solicitation";
import { SolicitationRepository } from "../../../repositories/SolicitationRepository";
import { CreateSolicitationDTO } from "../../../dtos/CreateSolicitationDTO";
import { Solicitations } from "../../../domains/entities/Solicitations";

export class SolicitationFsRepository implements SolicitationRepository {
  fileName = join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "files",
    "pedidos.json"
  );

  async getAll(): Promise<Solicitations> {
    const solicitations = JSON.parse(
      await readFile(this.fileName, "utf-8")
    ) as Solicitations;

    return solicitations;
  }

  async create(data: CreateSolicitationDTO): Promise<Solicitation> {
    const solicitationsList = await this.getAll();

    const solicitationsData = {
      id: solicitationsList.nextId++,
      timestamp: data.timestamp ?? new Date(),
      entregue: false,
      ...data,
    };

    solicitationsList.pedidos.push(solicitationsData);

    await writeFile(this.fileName, JSON.stringify(data, null, 2));

    return solicitationsData;
  }
}
