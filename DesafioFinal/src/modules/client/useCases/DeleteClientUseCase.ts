import { AppErrors } from '../../../shared/errors/AppErrors';
import { ClientRepository } from '../repositories/ClientRepository';

export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: number) {
    const clientExists = await this.clientRepository.findById(id);

    if (!clientExists) {
      throw new AppErrors('Client not exists!', 404);
    }

    await this.clientRepository.delete(id);
  }
}
