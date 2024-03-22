import { PrismaAnimalRepository } from "../prisma/repositories/PrismaAnimalRepository";
import { AnimalController } from "../infra/http/controllers/animal.controller";

import { ListAllAnimalUseCase } from "../../modules/animais/useCases/ListAllAnimalUseCase";
import { CreateAnimalUseCase } from "../../modules/animais/useCases/CreateAnimalUseCase";
import { UpdateAnimalUseCase } from "../../modules/animais/useCases/UpdateAnimalUseCase";

const prismaAnimalRepository = new PrismaAnimalRepository();

const listAllAnimalUseCase = new ListAllAnimalUseCase(prismaAnimalRepository);

const createAnimalUseCase = new CreateAnimalUseCase(prismaAnimalRepository);

const updateAnimalUseCase = new UpdateAnimalUseCase(prismaAnimalRepository);

const animalController = new AnimalController(
  listAllAnimalUseCase,
  createAnimalUseCase,
  updateAnimalUseCase
);

export { animalController };
