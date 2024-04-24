import { Request, Response } from 'express';
import { z } from 'zod';

import { ListAllBookUseCase } from '../../../../modules/book/useCases/ListAllBookUseCase';
import { ListByIdBookUseCase } from '../../../../modules/book/useCases/ListByIdBookUseCase';
import { ListAllBookByAuthorIdUseCase } from '../../../../modules/book/useCases/ListAllBookByAuthorIdUseCase';
import { UpdateBookUseCase } from '../../../../modules/book/useCases/UpdateBookUseCase';
import { CreateBookUseCase } from '../../../../modules/book/useCases/CreateBookUseCase';
import { CreateBookInfoUseCase } from '../../../../modules/book/useCases/CreateBookInfoUseCase';
import { UpdateBookInfoUseCase } from '../../../../modules/book/useCases/UpdateBookInfoUseCase';
import { CreateEvaluationBookUseCase } from '../../../../modules/book/useCases/CreateEvaluationBookUseCase';
import { DeleteEvaluationBookUseCase } from '../../../../modules/book/useCases/DeleteEvaluationBookUseCase';
import { DeleteBookInfoUseCase } from '../../../../modules/book/useCases/DeleteBookInfoUseCase';

export class BookController {
  constructor(
    private listAllBookUseCase: ListAllBookUseCase,
    private listByIdBookUseCase: ListByIdBookUseCase,
    private listAllBookByAuthorIdUseCase: ListAllBookByAuthorIdUseCase,
    private createBookUseCase: CreateBookUseCase,
    private updateBookUseCase: UpdateBookUseCase,
    private createBookInfoUseCase: CreateBookInfoUseCase,
    private updateBookInfoUseCase: UpdateBookInfoUseCase,
    private deleteBookInfoUseCase: DeleteBookInfoUseCase,
    private createEvaluationBookUseCase: CreateEvaluationBookUseCase,
    private deleteEvaluationBookUseCase: DeleteEvaluationBookUseCase,
  ) {}

  async get(req: Request, res: Response) {
    const books = await this.listAllBookUseCase.execute();

    return res.json(books);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const book = await this.listByIdBookUseCase.execute(Number(id));

    return res.json(book);
  }

  async getByAuthorId(req: Request, res: Response) {
    const { authorId } = req.params;

    const booksAuthor = await this.listAllBookByAuthorIdUseCase.execute(
      Number(authorId),
    );

    return res.json(booksAuthor);
  }

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
      stock: req.body.stock ?? 1,
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
      pages: z.number(),
      publishing: z.string(),
    });

    const { bookId, description, pages, publishing } = bodySchema.parse(
      req.body,
    );

    const bookInfo = await this.createBookInfoUseCase.execute({
      bookId,
      description,
      pages,
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

  async deleteBookInfo(req: Request, res: Response) {
    const { bookInfoId } = req.params;

    await this.deleteBookInfoUseCase.execute(Number(bookInfoId));

    return res.status(204).send();
  }

  async createEvaluation(req: Request, res: Response) {
    const { id } = req.params;

    const bodySchema = z.object({
      name: z.string(),
      note: z.number(),
      assessment: z.string(),
    });

    const { name, note, assessment } = bodySchema.parse(req.body);

    const evaluation = await this.createEvaluationBookUseCase.execute(
      Number(id),
      {
        name,
        note,
        assessment,
      },
    );

    return res.status(201).json(evaluation);
  }

  async deleteEvaluation(req: Request, res: Response) {
    const { id, index } = req.params;

    await this.deleteEvaluationBookUseCase.execute(Number(id), Number(index));

    return res.status(204).send();
  }
}
