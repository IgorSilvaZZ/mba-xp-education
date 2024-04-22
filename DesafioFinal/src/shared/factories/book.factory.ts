import { PrismaBookRepository } from '../infra/prisma/repositories/PrismaBookRepository';
import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';
import { MongooseBookInfoRepository } from '../infra/mongoose/repositories/MongooseBookInfoRepository';

import { CreateBookUseCase } from '../../modules/book/useCases/CreateBookUseCase';
import { UpdateBookUseCase } from '../../modules/book/useCases/UpdateBookUseCase';
import { CreateBookInfoUseCase } from '../../modules/book/useCases/CreateBookInfoUseCase';

import { BookController } from '../infra/http/controllers/book.controller';
import { UpdateBookInfoUseCase } from '../../modules/book/useCases/UpdateBookInfoUseCase';
import { ListByIdBookUseCase } from '../../modules/book/useCases/ListByIdBookUseCase';
import { ListAllBookUseCase } from '../../modules/book/useCases/ListAllBookUseCase';
import { ListAllBookByAuthorIdUseCase } from '../../modules/book/useCases/ListAllBookByAuthorIdUseCase';
import { CreateEvaluationBookUseCase } from '../../modules/book/useCases/CreateEvaluationBookUseCase';
import { DeleteEvaluationBookUseCase } from '../../modules/book/useCases/DeleteEvaluationBookUseCase';
import { DeleteBookInfoUseCase } from '../../modules/book/useCases/DeleteBookInfoUseCase';

const prismaAuthorRepository = new PrismaAuthorRepository();
const prismaBookRepository = new PrismaBookRepository();
const mongooseBookInfoRepository = new MongooseBookInfoRepository();

const listAllBookUseCase = new ListAllBookUseCase(prismaBookRepository);

const listByIdBookUseCase = new ListByIdBookUseCase(
  prismaBookRepository,
  mongooseBookInfoRepository,
);

const listAllBookByAuthorIdUseCase = new ListAllBookByAuthorIdUseCase(
  prismaBookRepository,
  prismaAuthorRepository,
);

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

const deleteBookInfoUseCase = new DeleteBookInfoUseCase(
  mongooseBookInfoRepository,
);

const createEvaluationBookUseCase = new CreateEvaluationBookUseCase(
  mongooseBookInfoRepository,
);

const deleteEvaluationBookUseCase = new DeleteEvaluationBookUseCase(
  mongooseBookInfoRepository,
);

const bookController = new BookController(
  listAllBookUseCase,
  listByIdBookUseCase,
  listAllBookByAuthorIdUseCase,
  createBookUseCase,
  updateBookUseCase,
  createBookInfoUseCase,
  updateBookInfoUseCase,
  deleteBookInfoUseCase,
  createEvaluationBookUseCase,
  deleteEvaluationBookUseCase,
);

export { bookController };
