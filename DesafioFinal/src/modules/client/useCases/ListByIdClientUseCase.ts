import { AppErrors } from '../../../shared/errors/AppErrors';
import { ClientRepository } from '../repositories/ClientRepository';

export class ListByIdClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: number) {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppErrors('Client not exists!', 404);
    }

    return client;
  }
}
