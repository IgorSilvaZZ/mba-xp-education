import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';

import { AuthorController } from '../infra/http/controllers/author.controller';

import { CreateAuthorUseCase } from '../../modules/author/useCases/CreateAuthorUseCase';

const prismaAuthorRepository = new PrismaAuthorRepository();

const createAuthorUseCase = new CreateAuthorUseCase(prismaAuthorRepository);

const authorController = new AuthorController(createAuthorUseCase);

export { authorController };
