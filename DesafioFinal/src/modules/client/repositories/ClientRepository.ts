import { Client } from "../interfaces/Client";

import { CreateClientDTO } from "../dtos/CreateClientDTO";

export abstract class ClientRepository {
  abstract findAll(): Promise<Client[]>;
  abstract findById(id: number): Promise<Client | null>;
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract create(data: CreateClientDTO): Promise<Client>;
}
