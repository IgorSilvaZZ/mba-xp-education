import { PrismaBookRepository } from '../infra/prisma/repositories/PrismaBookRepository';
import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';
import { MongooseBookInfoRepository } from '../infra/mongoose/repositories/MongooseBookInfoRepository';

import { CreateBookUseCase } from '../../modules/book/useCases/CreateBookUseCase';
import { UpdateBookUseCase } from '../../modules/book/useCases/UpdateBookUseCase';
import { CreateBookInfoUseCase } from '../../modules/book/useCases/CreateBookInfoUseCase';

import { BookController } from '../infra/http/controllers/book.controller';
import { UpdateBookInfoUseCase } from '../../modules/book/useCases/UpdateBookInfoUseCase';

const prismaAuthorRepository = new PrismaAuthorRepository();
const prismaBookRepository = new PrismaBookRepository();
const mongooseBookInfoRepository = new MongooseBookInfoRepository();

const createBookUseCase = new CreateBookUseCase(
  prismaBookRepository,
  prismaAuthorRepository,
);

const updateBookUseCase = new UpdateBookUseCase(prismaBookRepository);

const createBookInfoUseCase = new CreateBookInfoUseCase(
  mongooseBookInfoRepository,
  prismaBookRepository,
);

const updateBookInfoUseCase = new UpdateBookInfoUseCase(
  mongooseBookInfoRepository,
);

const bookController = new BookController(
  createBookUseCase,
  updateBookUseCase,
  createBookInfoUseCase,
  updateBookInfoUseCase,
);

export { bookController };
