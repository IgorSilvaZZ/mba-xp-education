import { Request, Response } from 'express';
import { z } from 'zod';

import { UpdateBookUseCase } from '../../../../modules/book/useCases/UpdateBookUseCase';
import { CreateBookUseCase } from '../../../../modules/book/useCases/CreateBookUseCase';
import { CreateBookInfoUseCase } from '../../../../modules/book/useCases/CreateBookInfoUseCase';
import { UpdateBookInfoUseCase } from '../../../../modules/book/useCases/UpdateBookInfoUseCase';

export class BookController {
  constructor(
    private createBookUseCase: CreateBookUseCase,
    private updateBookUseCase: UpdateBookUseCase,
    private createBookInfoUseCase: CreateBookInfoUseCase,
    private updateBookInfoUseCase: UpdateBookInfoUseCase,
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

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const bodySchema = z.object({
      value: z.number(),
    });

    const { value } = bodySchema.parse(req.body);

    const bookUpdated = await this.updateBookUseCase.execute(Number(id), {
      value,
    });

    return res.json(bookUpdated);
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

  async updateBookInfo(req: Request, res: Response) {
    const { bookInfoId } = req.params;

    const bodySchema = z.object({
      description: z.string(),
      publishing: z.string(),
    });

    const { description, publishing } = bodySchema.parse(req.body);

    await this.updateBookInfoUseCase.execute(Number(bookInfoId), {
      description,
      publishing,
    });

    return res.send();
  }
}
