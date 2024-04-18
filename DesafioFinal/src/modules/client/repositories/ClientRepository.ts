import { Client } from '../interfaces/Client';

import { CreateClientDTO } from '../dtos/CreateClientDTO';
import { UpdateClientDTO } from '../dtos/UpdateClientDTO';

export abstract class ClientRepository {
  abstract findAll(): Promise<Client[]>;
  abstract findById(id: number): Promise<Client | null>;
  abstract findByEmail(email: string): Promise<Client | null>;
  abstract create(data: CreateClientDTO): Promise<Client>;
  abstract update(id: number, data: UpdateClientDTO): Promise<Client>;
  abstract delete(id: number): Promise<void>;
}
