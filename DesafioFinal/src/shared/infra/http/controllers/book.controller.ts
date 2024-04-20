import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateBookInfoUseCase } from '../../../../modules/book/useCases/CreateBookInfoUseCase';
import { CreateBookUseCase } from '../../../../modules/book/useCases/CreateBookUseCase';

export class BookController {
  constructor(
    private createBookUseCase: CreateBookUseCase,
    private createBookInfoUseCase: CreateBookInfoUseCase,
  ) {}

  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string(),
      value: z.number(),
      fkAuthorId: z.number(),
    });

    const { name, value, fkAuthorId } = bodySchema.parse(req.body);

    const book = await this.createBookUseCase.execute({
      name,
      value,
      fkAuthorId,
    });

    return res.status(201).json(book);
  }

  async createBookInfo(req: Request, res: Response) {
    const bodySchema = z.object({
      bookId: z.number(),
      description: z.string(),
      publishing: z.string(),
    });

    const { bookId, description, publishing } = bodySchema.parse(req.body);

    const bookInfo = await this.createBookInfoUseCase.execute({
      bookId,
      description,
      publishing,
    });

    return res.status(201).json(bookInfo);
  }
}
