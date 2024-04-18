import { CreateClientUseCase } from "../../modules/client/useCases/CreateClientUseCase";
import { ListAllClientUseCase } from "../../modules/client/useCases/ListAllClientUseCase";
import { ClientController } from "../infra/http/controllers/client.controller";
import { PrismaClientRepository } from "../infra/prisma/repositories/PrismaClientRepository";

const prismaClientRepository = new PrismaClientRepository();

const listAllClientUseCase = new ListAllClientUseCase(prismaClientRepository);
const createClientUseCase = new CreateClientUseCase(prismaClientRepository);

const clientController = new ClientController(
  listAllClientUseCase,
  createClientUseCase
);

export { clientController };
