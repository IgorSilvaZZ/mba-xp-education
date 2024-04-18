import { Request, Response } from 'express';

import { ListAllClientUseCase } from '../../../../modules/client/useCases/ListAllClientUseCase';
import { ListByIdClientUseCase } from '../../../../modules/client/useCases/ListByIdClientUseCase';
import { CreateClientUseCase } from '../../../../modules/client/useCases/CreateClientUseCase';
import { UpdateClientUseCase } from '../../../../modules/client/useCases/UpdateClientUseCase';
import { UpdateClientDTO } from '../../../../modules/client/dtos/UpdateClientDTO';
import { DeleteClientUseCase } from '../../../../modules/client/useCases/DeleteClientUseCase';

export class ClientController {
  constructor(
    private listAllClientUseCase: ListAllClientUseCase,
    private listByIdClientUseCase: ListByIdClientUseCase,
    private createClientUseCase: CreateClientUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
  ) {}

  async get(req: Request, res: Response) {
    const clients = await this.listAllClientUseCase.execute();

    return res.json(clients);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const client = await this.listByIdClientUseCase.execute(Number(id));

    return res.json(client);
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

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password, telephone, address } = req.body;

    const dataUpdated: UpdateClientDTO = {
      name,
      email,
      password,
      telephone,
      address,
    };

    const clientUpdated = await this.updateClientUseCase.execute(
      Number(id),
      dataUpdated,
    );

    return res.json(clientUpdated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.deleteClientUseCase.execute(Number(id));

    return res.status(204).send();
  }
}
