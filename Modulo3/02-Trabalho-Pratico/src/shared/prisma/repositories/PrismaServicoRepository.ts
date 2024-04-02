import { prisma } from "..";

import { CreateServicoDTO } from "../../../modules/servicos/dtos/CreateServicoDTO";
import { Servico } from "../../../modules/servicos/interfaces/Servico";
import { ServicoRepository } from "../../../modules/servicos/respositories/ServicoRepository";

export class PrismaServicoRepository implements ServicoRepository {
  async getAll(): Promise<Servico[]> {
    const servicos = await prisma.servico.findMany({
      include: {
        animal: {
          include: {
            proprietario: true
          }
        }
      }
    });

    return servicos;
  }

  async findByProprietarioId(fkProprietario: number): Promise<Servico[]> {
    const servicos = await prisma.servico.findMany({
      where: {
        animal: {
          fkProprietario,
        },
      },
      include: {
        animal: {
          include: {
            proprietario: true
          }
        },
      },
    });

    return servicos;
  }

  async create(data: CreateServicoDTO): Promise<Servico> {
    const servico = await prisma.servico.create({
      data,
    });

    return servico;
  }
}
