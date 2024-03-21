import { ClientRepository } from "../repositories/client.repository.js";

export class ClientService {
  constructor() {
    this._clientRepository = new ClientRepository();
  }

  async getClients() {
    const clients = await this._clientRepository.getClients();

    return clients;
  }

  async getClientById(id) {
    const client = await this._clientRepository.getClientById(id);

    return client;
  }

  async create(dataClient) {
    const client = await this._clientRepository.create(dataClient);

    return client;
  }

  async updateClient(id, dataClient) {
    const clientUpdated = await this._clientRepository.updateClientById(
      id,
      dataClient
    );

    return clientUpdated;
  }

  async deleteClient(id) {
    await this._clientRepository.deleteClientById(id);
  }
}
