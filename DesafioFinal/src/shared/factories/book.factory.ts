import { PrismaBookRepository } from '../infra/prisma/repositories/PrismaBookRepository';
import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';
import { MongooseBookInfoRepository } from '../infra/mongoose/repositories/MongooseBookInfoRepository';

import { CreateBookUseCase } from '../../modules/book/useCases/CreateBookUseCase';
import { CreateBookInfoUseCase } from '../../modules/book/useCases/CreateBookInfoUseCase';

import { BookController } from '../infra/http/controllers/book.controller';

const prismaAuthorRepository = new PrismaAuthorRepository();
const prismaBookRepository = new PrismaBookRepository();
const mongooseBookInfoRepository = new MongooseBookInfoRepository();

const createBookUseCase = new CreateBookUseCase(
  prismaBookRepository,
  prismaAuthorRepository,
);
const createBookInfoUseCase = new CreateBookInfoUseCase(
  mongooseBookInfoRepository,
  prismaBookRepository,
);

const bookController = new BookController(
  createBookUseCase,
  createBookInfoUseCase,
);

export { bookController };
