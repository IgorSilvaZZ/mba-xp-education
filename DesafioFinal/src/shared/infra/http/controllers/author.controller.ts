import { Request, Response } from 'express';
import { z } from 'zod';

import { CreateAuthorUseCase } from '../../../../modules/author/useCases/CreateAuthorUseCase';

export class AuthorController {
  constructor(private createAuthorUseCase: CreateAuthorUseCase) {}

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
