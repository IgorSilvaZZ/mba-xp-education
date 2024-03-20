import { ClientRepository } from "../repositories/client.repository.js";

export class ClientService {
  constructor() {
    this._clientRepository = new ClientRepository();
  }

  async create() {}
}
