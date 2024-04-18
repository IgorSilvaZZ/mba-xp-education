import { PrismaClientRepository } from '../infra/prisma/repositories/PrismaClientRepository';

import { ClientController } from '../infra/http/controllers/client.controller';

import { ListAllClientUseCase } from '../../modules/client/useCases/ListAllClientUseCase';
import { ListByIdClientUseCase } from '../../modules/client/useCases/ListByIdClientUseCase';
import { CreateClientUseCase } from '../../modules/client/useCases/CreateClientUseCase';
import { UpdateClientUseCase } from '../../modules/client/useCases/UpdateClientUseCase';

const prismaClientRepository = new PrismaClientRepository();

const listAllClientUseCase = new ListAllClientUseCase(prismaClientRepository);
const createClientUseCase = new CreateClientUseCase(prismaClientRepository);
const listByIdClientUseCase = new ListByIdClientUseCase(prismaClientRepository);
const updateClientUseCase = new UpdateClientUseCase(prismaClientRepository);

const clientController = new ClientController(
  listAllClientUseCase,
  listByIdClientUseCase,
  createClientUseCase,
  updateClientUseCase,
);

export { clientController };
