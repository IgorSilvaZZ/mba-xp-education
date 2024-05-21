import { PrismaAnimalRepository } from "../prisma/repositories/PrismaAnimalRepository";
import { AnimalController } from "../infra/http/controllers/animal.controller";

import { ListAllAnimalUseCase } from "../../modules/animais/useCases/ListAllAnimalUseCase";
import { FindByIdAnimalUseCase } from "../../modules/animais/useCases/FindByIdAnimalUseCase";
import { ListAllAnimalFindByProprietarioIdUseCase } from "../../modules/animais/useCases/ListAllAnimalFindByProprietarioIdUseCase";
import { CreateAnimalUseCase } from "../../modules/animais/useCases/CreateAnimalUseCase";
import { UpdateAnimalUseCase } from "../../modules/animais/useCases/UpdateAnimalUseCase";
import { DeleteAnimalUseCase } from "../../modules/animais/useCases/DeleteAnimalUseCase";

const prismaAnimalRepository = new PrismaAnimalRepository();

const listAllAnimalUseCase = new ListAllAnimalUseCase(prismaAnimalRepository);

const findByIdAnimalUseCase = new FindByIdAnimalUseCase(prismaAnimalRepository);

const listAllAnimalFindByProprietarioIdUseCase = new ListAllAnimalFindByProprietarioIdUseCase(prismaAnimalRepository);

const createAnimalUseCase = new CreateAnimalUseCase(prismaAnimalRepository);

const updateAnimalUseCase = new UpdateAnimalUseCase(prismaAnimalRepository);

const deleteAnimalUseCase = new DeleteAnimalUseCase(prismaAnimalRepository);

const animalController = new AnimalController(
  listAllAnimalUseCase,
  findByIdAnimalUseCase,
  listAllAnimalFindByProprietarioIdUseCase,
  createAnimalUseCase,
  updateAnimalUseCase,
  deleteAnimalUseCase
);

export { animalController };
