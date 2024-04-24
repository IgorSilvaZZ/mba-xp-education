import { PrismaAuthorRepository } from '../infra/prisma/repositories/PrismaAuthorRepository';
import { PrismaBookRepository } from '../infra/prisma/repositories/PrismaBookRepository';
import { PrismaSaleRepository } from '../infra/prisma/repositories/PrismaSaleRepository';
import { PrismaClientRepository } from '../infra/prisma/repositories/PrismaClientRepository';

import { SaleController } from '../infra/http/controllers/sale.controller';

import { ListAllSaleUseCase } from '../../modules/sale/useCases/ListAllSaleUseCase';
import { ListBySaleIdUseCase } from '../../modules/sale/useCases/ListBySaleIdUseCase';
import { CreateSaleUseCase } from '../../modules/sale/useCases/CreateSaleUseCase';
import { ListByClientIdUseCase } from '../../modules/sale/useCases/ListByClientIdUseCase';
import { ListSalesByBookIdUseCase } from '../../modules/sale/useCases/ListSalesByBookIdUseCase';
import { ListSalesByAuthorIdUseCase } from '../../modules/sale/useCases/ListSalesByAuthorIdUseCase';

const prismaAuthorRepository = new PrismaAuthorRepository();
const prismaClientRepository = new PrismaClientRepository();
const prismaBookRepository = new PrismaBookRepository();
const prismaSaleRepository = new PrismaSaleRepository();

const listAllSaleUseCase = new ListAllSaleUseCase(prismaSaleRepository);

const listBySaleIdUseCase = new ListBySaleIdUseCase(prismaSaleRepository);

const listByClientIdUseCase = new ListByClientIdUseCase(
  prismaSaleRepository,
  prismaClientRepository,
);

const listSalesByBookIdUseCase = new ListSalesByBookIdUseCase(
  prismaSaleRepository,
  prismaBookRepository,
);

const listSalesByAuthorIdUseCase = new ListSalesByAuthorIdUseCase(
  prismaSaleRepository,
  prismaAuthorRepository,
);

const createSaleUseCase = new CreateSaleUseCase(
  prismaSaleRepository,
  prismaBookRepository,
  prismaClientRepository,
);

const saleController = new SaleController(
  listAllSaleUseCase,
  listBySaleIdUseCase,
  listByClientIdUseCase,
  listSalesByBookIdUseCase,
  listSalesByAuthorIdUseCase,
  createSaleUseCase,
);

export { saleController };
