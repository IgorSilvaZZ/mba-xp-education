import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';
import { PrismaBookRepository } from '../infra/prisma/repositories/PrismaBookRepository';

import { AuthorController } from '../infra/http/controllers/author.controller';

import { CreateAuthorUseCase } from '../../modules/author/useCases/CreateAuthorUseCase';
import { ListAuthorByIdUseCase } from '../../modules/author/useCases/ListAuthorByIdUseCase';
import { ListAllAuthorsUseCase } from '../../modules/author/useCases/ListAllAuthorsUseCase';
import { UpdateAuthorUseCase } from '../../modules/author/useCases/UpdateAuthorUseCase';
import { DeleteAuthorUseCase } from '../../modules/author/useCases/DeleteAuthorUseCase';

const prismaAuthorRepository = new PrismaAuthorRepository();
const prismaBookRepository = new PrismaBookRepository();

const listAllAuthorsUseCase = new ListAllAuthorsUseCase(prismaAuthorRepository);
const listAuthorByIdUseCase = new ListAuthorByIdUseCase(prismaAuthorRepository);
const createAuthorUseCase = new CreateAuthorUseCase(prismaAuthorRepository);
const updateAuthorUseCase = new UpdateAuthorUseCase(prismaAuthorRepository);
const deleteAuthorUseCase = new DeleteAuthorUseCase(
  prismaAuthorRepository,
  prismaBookRepository,
);

const authorController = new AuthorController(
  listAllAuthorsUseCase,
  listAuthorByIdUseCase,
  createAuthorUseCase,
  updateAuthorUseCase,
  deleteAuthorUseCase,
);

export { authorController };
