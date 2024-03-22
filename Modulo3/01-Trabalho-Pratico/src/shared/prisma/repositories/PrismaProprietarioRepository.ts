import { prisma } from "..";

import { CreateProprietarioDTO } from "../../../modules/proprietarios/dtos/CreateProprietarioDTO";
import { UpdateProprietarioDTO } from "../../../modules/proprietarios/dtos/UpdateProprietadioDTO";
import { Proprietario } from "../../../modules/proprietarios/interfaces/Proprietario";
import { ProprietarioRepository } from "../../../modules/proprietarios/repositories/ProprietarioRepository";

export class PrismaProprietarioRepository implements ProprietarioRepository {
  async getAll(): Promise<Proprietario[]> {
    const proprietarios = await prisma.proprietario.findMany();

    return proprietarios;
  }

  async getById(proprietarioId: number): Promise<Proprietario | null> {
    const proprietario = await prisma.proprietario.findFirst({
      where: { proprietarioId },
    });

    return proprietario;
  }

  async create(data: CreateProprietarioDTO): Promise<Proprietario> {
    const proprietario = await prisma.proprietario.create({
      data,
    });

    return proprietario;
  }

  async update(
    proprietarioId: number,
    data: UpdateProprietarioDTO
  ): Promise<Proprietario> {
    const proprietarioUpdated = await prisma.proprietario.update({
      where: { proprietarioId },
      data,
    });

    return proprietarioUpdated;
  }
}
