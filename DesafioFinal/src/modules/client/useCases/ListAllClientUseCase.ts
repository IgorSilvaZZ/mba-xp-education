import { ClientRepository } from "../repositories/ClientRepository";

export class ListAllClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute() {
    const clients = await this.clientRepository.findAll();

    return clients;
  }
}
