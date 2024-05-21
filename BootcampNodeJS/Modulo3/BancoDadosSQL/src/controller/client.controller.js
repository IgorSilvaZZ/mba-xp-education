import { ClientService } from "../service/client.service.js";

export class ClientController {
  constructor() {
    this._clientService = new ClientService();
  }

  async get(req, res, next) {
    try {
      const clients = await this._clientService.getClients();

      return res.json(clients);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;

    try {
      const clients = await this._clientService.getClientById(id);

      return res.json(clients);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const { name, cpf, phone, email, address } = req.body;

    try {
      if (!name || !cpf || !phone || !email || !address) {
        throw new Error("Name, CPF, Phone, Email and Address is required!");
      }

      const dataClient = {
        name,
        cpf,
        phone,
        email,
        address,
      };

      const client = await this._clientService.create(dataClient);

      res.status(201).json(client);
      logger.info(
        `POST /client - ${JSON.stringify({ name, cpf, phone, email, address })}`
      );
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { name, cpf, phone, email, address } = req.body;

    try {
      if (!id) {
        throw new Error("Id is required!");
      }

      if (!name || !cpf || !phone || !email || !address) {
        throw new Error("Name, CPF, Phone, Email and Address is required!");
      }

      const dataClient = {
        name,
        cpf,
        phone,
        email,
        address,
      };

      const clientUpdated = await this._clientService.updateClient(
        id,
        dataClient
      );

      return res.json(clientUpdated);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await this._clientService.deleteClient(id);

      return res.end();
    } catch (error) {
      next(error);
    }
  }
}
