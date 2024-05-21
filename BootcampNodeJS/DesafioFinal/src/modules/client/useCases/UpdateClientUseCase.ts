import { hash } from 'bcryptjs';

import { ClientRepository } from '../repositories/ClientRepository';

import { UpdateClientDTO } from '../dtos/UpdateClientDTO';
import { AppErrors } from '../../../shared/errors/AppErrors';

export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(
    id: number,
    { name, email, password, address, telephone }: UpdateClientDTO,
  ) {
    const clientExists = await this.clientRepository.findById(id);

    if (!clientExists) {
      throw new AppErrors('Client not exists!', 404);
    }

    const passwordHash = await hash(password, 8);

    const dataUpdated = {
      name,
      email,
      password: passwordHash,
      address,
      telephone,
    };

    const clientUpdated = await this.clientRepository.update(id, dataUpdated);

    return clientUpdated;
  }
}
