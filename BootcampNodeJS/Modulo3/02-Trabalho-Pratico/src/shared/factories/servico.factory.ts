import { PrismaServicoRepository } from "../prisma/repositories/PrismaServicoRepository";

import { ListAllServicoUseCase } from "../../modules/servicos/useCases/ListAllServicoUseCase";
import { ListAllServicoFindByProprietarioIdUseCase } from "../../modules/servicos/useCases/ListAllServicoFindByProprietarioIdUseCase";
import { CreateServicoUseCase } from "../../modules/servicos/useCases/CreateServicoUseCase";
import { ServicoController } from "../infra/http/controllers/servico.controller";

const prismaServicoRepository = new PrismaServicoRepository();

const listAllServicoUseCase = new ListAllServicoUseCase(
  prismaServicoRepository
);

const listAllServicoFindByProprietarioId =
  new ListAllServicoFindByProprietarioIdUseCase(prismaServicoRepository);

const createServicoUseCase = new CreateServicoUseCase(prismaServicoRepository);

const servicoController = new ServicoController(
  listAllServicoUseCase,
  listAllServicoFindByProprietarioId,
  createServicoUseCase
);

export { servicoController };
