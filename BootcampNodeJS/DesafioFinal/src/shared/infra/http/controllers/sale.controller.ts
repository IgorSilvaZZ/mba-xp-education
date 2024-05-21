import { Request, Response } from 'express';
import { z } from 'zod';

import { ListBySaleIdUseCase } from '../../../../modules/sale/useCases/ListBySaleIdUseCase';
import { ListAllSaleUseCase } from '../../../../modules/sale/useCases/ListAllSaleUseCase';
import { ListByClientIdUseCase } from '../../../../modules/sale/useCases/ListByClientIdUseCase';
import { ListSalesByBookIdUseCase } from '../../../../modules/sale/useCases/ListSalesByBookIdUseCase';
import { ListSalesByAuthorIdUseCase } from '../../../../modules/sale/useCases/ListSalesByAuthorIdUseCase';
import { CreateSaleUseCase } from '../../../../modules/sale/useCases/CreateSaleUseCase';

export class SaleController {
  constructor(
    private listAllSaleUseCase: ListAllSaleUseCase,
    private listBySaleIdUseCase: ListBySaleIdUseCase,
    private listByClientIdUseCase: ListByClientIdUseCase,
    private listSalesByBookIdUseCase: ListSalesByBookIdUseCase,
    private listSalesByAuthorIdUseCase: ListSalesByAuthorIdUseCase,
    private createSaleUseCase: CreateSaleUseCase,
  ) {}

  async get(req: Request, res: Response) {
    const sales = await this.listAllSaleUseCase.execute();

    return res.json(sales);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const sale = await this.listBySaleIdUseCase.execute(Number(id));

    return res.json(sale);
  }

  async getClientById(req: Request, res: Response) {
    let clientId = req.client.id !== 'admin_id' ? req.client.id : req.params.clientId;

    const sales = await this.listByClientIdUseCase.execute(Number(clientId));

    return res.json(sales);
  }

  async getBookById(req: Request, res: Response) {
    const { bookId } = req.params;

    const sales = await this.listSalesByBookIdUseCase.execute(Number(bookId));

    return res.json(sales);
  }

  async getAuthorById(req: Request, res: Response) {
    const { authorId } = req.params;

    const sales = await this.listSalesByAuthorIdUseCase.execute(
      Number(authorId),
    );

    return res.json(sales);
  }

  async create(req: Request, res: Response) {
    let fkClientId =
      req.client.id !== 'admin_id' ? req.client.id : req.body.fkClientId;

    const bodySchema = z.object({
      date: z.string(),
      fkBookId: z.number(),
    });

    const { date, fkBookId } = bodySchema.parse(req.body);

    const sale = await this.createSaleUseCase.execute({
      date: new Date(date),
      fkClientId,
      fkBookId,
    });

    return res.status(201).json(sale);
  }
}
