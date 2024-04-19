import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';

import { AuthorController } from '../infra/http/controllers/author.controller';

import { CreateAuthorUseCase } from '../../modules/author/useCases/CreateAuthorUseCase';
import { ListAuthorByIdUseCase } from '../../modules/author/useCases/ListAuthorByIdUseCase';
import { ListAllAuthorsUseCase } from '../../modules/author/useCases/ListAllAuthorsUseCase';

const prismaAuthorRepository = new PrismaAuthorRepository();

const listAllAuthorsUseCase = new ListAllAuthorsUseCase(prismaAuthorRepository);
const listAuthorByIdUseCase = new ListAuthorByIdUseCase(prismaAuthorRepository);
const createAuthorUseCase = new CreateAuthorUseCase(prismaAuthorRepository);

const authorController = new AuthorController(
  listAllAuthorsUseCase,
  listAuthorByIdUseCase,
  createAuthorUseCase,
);

export { authorController };
