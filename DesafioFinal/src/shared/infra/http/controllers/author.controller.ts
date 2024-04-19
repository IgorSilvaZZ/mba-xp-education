import { Request, Response } from 'express';
import { z } from 'zod';

import { ListAllAuthorsUseCase } from '../../../../modules/author/useCases/ListAllAuthorsUseCase';
import { ListAuthorByIdUseCase } from '../../../../modules/author/useCases/ListAuthorByIdUseCase';
import { CreateAuthorUseCase } from '../../../../modules/author/useCases/CreateAuthorUseCase';

export class AuthorController {
  constructor(
    private listAllAuthorsUseCase: ListAllAuthorsUseCase,
    private listAuthorByIdUseCase: ListAuthorByIdUseCase,
    private createAuthorUseCase: CreateAuthorUseCase,
  ) {}

  async get(req: Request, res: Response) {
    const authors = await this.listAllAuthorsUseCase.execute();

    return res.json(authors);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const author = await this.listAuthorByIdUseCase.execute(Number(id));

    return res.json(author);
  }

  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      telephone: z.string(),
    });

    const { name, email, telephone } = bodySchema.parse(req.body);

    const author = await this.createAuthorUseCase.execute({
      name,
      email,
      telephone,
    });

    return res.status(201).json(author);
  }
}
