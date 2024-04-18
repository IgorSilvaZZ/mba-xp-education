import { Request, Response } from "express";

import { CreateClientUseCase } from "../../../../modules/client/useCases/CreateClientUseCase";
import { ListAllClientUseCase } from "../../../../modules/client/useCases/ListAllClientUseCase";

export class ClientController {
  constructor(
    private listAllClientUseCase: ListAllClientUseCase,
    private createClientUseCase: CreateClientUseCase
  ) {}

  async get(req: Request, res: Response) {
    const clients = await this.listAllClientUseCase.execute();

    return res.json(clients);
  }

  async create(req: Request, res: Response) {
    const { name, email, password, telephone, address } = req.body;

    const client = await this.createClientUseCase.execute({
      name,
      email,
      password,
      telephone,
      address,
    });

    return res.status(201).json(client);
  }
}
