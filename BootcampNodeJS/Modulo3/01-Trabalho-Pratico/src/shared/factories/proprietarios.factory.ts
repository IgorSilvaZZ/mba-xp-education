import { PrismaProprietarioRepository } from "../prisma/repositories/PrismaProprietarioRepository";
import { PrismaAnimalRepository } from "../prisma/repositories/PrismaAnimalRepository";

import { ListAllProprietariosUseCase } from "../../modules/proprietarios/useCases/ListAllProprietariosUseCase";
import { FindByProprietarioUseCase } from "../../modules/proprietarios/useCases/FindByProprietarioUseCase";
import { CreateProprietarioUseCase } from "../../modules/proprietarios/useCases/CreateProprietarioUseCase";
import { ProprietarioController } from "../infra/http/controllers/proprietario.controller";
import { UpdateProprietarioUseCase } from "../../modules/proprietarios/useCases/UpdateProprietarioUseCase";
import { DeleteProprietarioUseCase } from "../../modules/proprietarios/useCases/DeleteProprietarioUseCase";

const prismaProprietarioRepository = new PrismaProprietarioRepository();
const prismaAnimalRepository = new PrismaAnimalRepository();

const listAllProprietariosUseCase = new ListAllProprietariosUseCase(
  prismaProprietarioRepository
);

const findByProprietarioUseCase = new FindByProprietarioUseCase(
  prismaProprietarioRepository
);

const createProprietarioUseCase = new CreateProprietarioUseCase(
  prismaProprietarioRepository
);

const updateProprietarioUseCase = new UpdateProprietarioUseCase(
  prismaProprietarioRepository
);

const deleteAnimalUseCase = new DeleteProprietarioUseCase(
  prismaProprietarioRepository, 
  prismaAnimalRepository
);

const proprietarioController = new ProprietarioController(
  listAllProprietariosUseCase,
  findByProprietarioUseCase,
  createProprietarioUseCase,
  updateProprietarioUseCase,
  deleteAnimalUseCase
);

export { proprietarioController };
